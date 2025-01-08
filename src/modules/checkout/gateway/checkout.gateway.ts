/**
 * file: src/modules/checkout/gateway/checkout.gateway.ts
 * description: file responsible for the definition of the checkout gateway.
 * data: 12/01/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Order from "../domain/order.entity";

export default interface CheckoutGateway {
  addOrder(order: Order): Promise<Order>;
  findOrder(id: string): Promise<Order | undefined | null>;
}