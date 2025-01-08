/**
 * file: src/modules/invoice/usecase/generated-invoice/generate-invoice.usecase.ts
 * description: file responsible for the definition of the generate invoice usecase.
 * data: 11/26/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Address from "../../domain/address.entity";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";


export default class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(private readonly invoiceGateway: InvoiceGateway) { }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoiceProps = new Invoice({
      name: input.name,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      }),
      items: input.items.map(
        (item) =>
          new Product({
            id: item.id,
            name: item.name,
            price: item.price,
          })
      ),
    });
    await this.invoiceGateway.create(invoiceProps);
    return {
      id: invoiceProps.id.id,
      name: invoiceProps.name,
      document: invoiceProps.document,
      street: invoiceProps.address.street,
      number: invoiceProps.address.number,
      complement: invoiceProps.address.complement,
      city: invoiceProps.address.city,
      state: invoiceProps.address.state,
      zipCode: invoiceProps.address.zipCode,
      items: invoiceProps.items.map((item: any) => new Product({
        id: new Id(item.id.id),
        name: item.name,
        price: item.price,
      })),
      total: invoiceProps.total,
    };
  }
} 