/**
 * file: src/modules/payment/gateway/payment.gateway.ts
 * description: file responsible for the definition of the payment gateway interface.
 * data: 10/07/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Transaction from "../domain/transaction.entity";

export default interface PaymentGateway {
  save(input: Transaction): Promise<Transaction>;
}