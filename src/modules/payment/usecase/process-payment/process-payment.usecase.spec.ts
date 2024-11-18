/**
 * file: src/modules/payment/usecase/process-payment/process-payment.usecase.spec.ts
 * description: file responsible for the definition of the process payment usecase test.
 * data: 10/07/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction.entity";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transactionApproved = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
  status: "approved",
});

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transactionApproved)),
  };
};

const transactionDeclined = new Transaction({
  id: new Id("1"),
  amount: 50,
  orderId: "1",
  status: "declined",
});

const MockRepositoryDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined)),
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

    expect(result.transactionId).toBe(transactionApproved.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.status).toBe("approved");
    expect(result.amount).toBe(100);
    expect(result.orderId).toBe("1");
    expect(result.createdAt).toBe(transactionApproved.createdAt);
    expect(result.updatedAt).toBe(transactionApproved.updatedAt);
  });

  it("should decline a transaction", async () => {
    const paymentRepository = MockRepositoryDeclined();
    const useCase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
      orderId: "1",
      amount: 50,
    };

    const result = await useCase.execute(input);

    expect(result.transactionId).toBe(transactionDeclined.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.status).toBe("declined");
    expect(result.amount).toBe(50);
    expect(result.orderId).toBe("1");
    expect(result.createdAt).toBe(transactionDeclined.createdAt);
    expect(result.updatedAt).toBe(transactionDeclined.updatedAt);
  })
});
