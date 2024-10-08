/**
 * file: src/modules/payment/usecase/process-payment/process-payment.usecase.spec.ts
 * description: file responsible for the definition of the process payment usecase test.
 * data: 10/07/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction.entity";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1"
});

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
  };
};

describe("Process Payment Use Case Unit Test", () => {
  it("should approve a transaction", async () => {
    const paymentRepository = MockRepository();
    const useCase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
      amount: 100,
      orderId: "1"
    };

    const result = await useCase.execute(input);

    expect(result.transactionId).toBe(transaction.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.status).toBe("approved");
    expect(result.amount).toBe(100);
    expect(result.orderId).toBe("1");
    expect(result.createdAt).toBe(transaction.createdAt);
    expect(result.updatedAt).toBe(transaction.updatedAt);
  });
});
