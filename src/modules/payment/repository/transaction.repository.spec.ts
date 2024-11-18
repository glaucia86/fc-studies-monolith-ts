/**
 * file: src/modules/payment/repository/transaction.repository.spec.ts
 * description: file responsible for the definition of the transaction repository test.
 * data: 11/18/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Sequelize } from "sequelize-typescript"
import TransactionModel from "./transaction.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction.entity";
import TransactionRepository from "./transaction.repository";

describe("Transaction Repository Unit Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should save a transaction", async () => {
    const transaction = new Transaction({
      id: new Id("1"),
      amount: 100,
      orderId: "1",
    });

    transaction.approve();

    const repository = new TransactionRepository();
    const result = await repository.save(transaction);

    expect(result.id.id).toBe(transaction.id.id);
    expect(result.status).toBe("approved");
    expect(result.amount).toBe(transaction.amount);
    expect(result.orderId).toBe(transaction.orderId);
  });
});
