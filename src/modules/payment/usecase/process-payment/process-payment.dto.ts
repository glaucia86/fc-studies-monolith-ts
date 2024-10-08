/**
 * file: src/modules/payment/usecase/process-payment/process-payment.dto.ts
 * description: file responsible for the definition of the dto of the process payment.
 * data: 10/07/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export interface ProcessPaymentInputDto {
  orderId: string;
  amount: number;
}

export interface ProcessPaymentOutputDto {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}