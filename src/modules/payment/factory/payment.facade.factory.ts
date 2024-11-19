/**
 * file: src/modules/payment/facade/payment.facade.factory.ts
 * description: file responsible for the definition of the payment facade.
 * data: 11/19/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import PaymentFacade from "../facade/payment.facade";
import PaymentFacadeInterface from "../facade/payment.facade.interface";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory {
  static create(): PaymentFacadeInterface {
    const transactionRepository = new TransactionRepository();
    const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepository);
    const paymentFacade = new PaymentFacade(processPaymentUseCase);

    return paymentFacade;
  }
};