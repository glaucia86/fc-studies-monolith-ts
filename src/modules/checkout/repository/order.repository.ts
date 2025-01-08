/**
 * file: src/modules/checkout/repository/order.repository.ts
 * description: file responsible for the definition of the order repository.
 * data: 01/07/2025
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../@shared/domain/value-object/id.value-object";
import Order from "../domain/order.entity";
import { CheckoutGateway } from "../gateway/checkout.gateway";
import { OrderModel } from "./order.model";

function orderModelToOrder(orderModel: OrderModel): Order {
  const order = new Order({
    id: new Id(orderModel.id),
    client: orderModel.client,
    products: orderModel.products,
    status: orderModel.status,
    invoiceId: orderModel.invoiceId,
  })

  return order;
}

export class OrderRepository implements CheckoutGateway {

  async addOrder(order: Order): Promise<Order> {
    const { id, status, client, products, invoiceId } = order;

    const orderCreated = await OrderModel.create({
      id: id.id,
      status,
      client,
      products,
      invoiceId,
    });

    const result = orderModelToOrder(orderCreated);

    return result;
  }

  async findOrder(id: string): Promise<Order> {
    const orderOnDatabase = await OrderModel.findByPk(id);
    const order = orderModelToOrder(orderOnDatabase);

    return order;
  }
}

