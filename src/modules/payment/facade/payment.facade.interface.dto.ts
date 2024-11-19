/**
 * file: src/modules/payment/facade/payment.facade.interface.dto.ts
 * description: file responsible for the definition of the facade interface.
 * data: 11/19/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export interface PaymentoFacadeInterfaceInputDto {
  id?: string;
  amount: number;
}

export interface PaymentFacadeInterfaceOutputDto {
  transactionId: string;
  amount: number;
  orderId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}