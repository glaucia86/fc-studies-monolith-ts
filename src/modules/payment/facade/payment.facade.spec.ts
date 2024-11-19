/**
 * file: src/modules/payment/facade/payment.facade.spec.ts
 * description: file responsible for the definition of the payment facade.
 * data: 11/19/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Sequelize } from "sequelize-typescript"
import TransactionModel from "../repository/transaction.model"
import TransactionRepository from "../repository/transaction.repository"
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase"
import PaymentFacade from "./payment.facade"

describe("Payment Facade test", () => {

  let sequelize: Sequelize

  beforeEach(async () => {

    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([TransactionModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a transaction", async () => {
    const repository = new TransactionRepository();
    const useCase = new ProcessPaymentUseCase(repository);
    const facade = new PaymentFacade(useCase);

    const input = {
      orderId: "order-1",
      amount: 100.00,
    }

    const output = await facade.process(input);

    expect(output.transactionId).toBeDefined();
    expect(output.orderId).toBe(input.orderId);
    expect(output.amount).toBe(input.amount);
    expect(output.status).toBe("approved");
  });
});