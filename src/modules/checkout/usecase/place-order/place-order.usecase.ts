/**
 * file: src/modules/checkout/usecase/place-order/place-order.usecase.ts
 * description: file responsible for the definition of the place order use case.
 * data: 12/01/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import { InvoiceFacadeInterface } from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/payment.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface.dto";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import { CheckoutGateway } from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface;
  private _productFacade: ProductAdmFacadeInterface;
  private _catalogFacade: StoreCatalogFacadeInterface;
  private _invoiceFacade: InvoiceFacadeInterface;
  private _paymentFacade: PaymentFacadeInterface;
  private _orderRepository: CheckoutGateway;

  constructor(
    clientFacade: ClientAdmFacadeInterface,
    productFacade: ProductAdmFacadeInterface,
    catalogFacade: StoreCatalogFacadeInterface,
    invoiceFacade: InvoiceFacadeInterface,
    paymentFacade: PaymentFacadeInterface,
    orderRepository: CheckoutGateway,

  ) {
    this._clientFacade = clientFacade;
    this._productFacade = productFacade;
    this._catalogFacade = catalogFacade;
    this._invoiceFacade = invoiceFacade;
    this._paymentFacade = paymentFacade;
    this._orderRepository = orderRepository;
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this._clientFacade.find({ id: input.clientId });
    if (!client) {
      throw new Error('Client not found');
    }

    await this.validateProducts(input);

    const products = await Promise.all(input.products.map(p => this.getProduct(p.productId)));

    const orderClient = new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address,
    });

    const order = new Order({
      client: orderClient,
      products: products,
    });

    const payment = await this._paymentFacade.process({
      orderId: order.id.id,
      amount: order.total,
    })

    const invoice =
      payment.status === "approved"
        ? await this._invoiceFacade.generateInvoice({
          city: client.address,
          zipCode: client.address,
          street: client.address,
          state: client.address,
          complement: client.address,
          number: client.address,
          name: client.name,
          document: client.document,
          items: products.map((p) => ({
            id: p.id.id,
            name: p.name,
            price: p.salesPrice,
          })),
        })
        : null;

    payment.status === 'approved' && order.approved();

    const invoiceId = payment.status === 'approved' ? invoice.id : null;

    order.setInvoiceId(invoiceId);
    this._orderRepository.addOrder(order);

    return {
      id: order.id.id,
      invoiceId,
      status: order.status,
      total: order.total,
      products: products.map((p) => ({ productId: p.id.id })),
    };
  }

  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if (input.products.length === 0) {
      throw new Error('No products selected');
    }

    for (const p of input.products) {
      const product = await this._productFacade.checkStock({ productId: p.productId });
      if (product.stock <= 0) {
        throw new Error(`Product ${p.productId} is not available in stock`);
      }
    }
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this._catalogFacade.findById({ id: productId });

    if (!product) {
      throw new Error('Product not found');
    }

    const productProps = {
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };

    return new Product(productProps);
  }
}