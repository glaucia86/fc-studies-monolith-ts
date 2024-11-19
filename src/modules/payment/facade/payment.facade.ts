/**
 * file: src/modules/payment/facade/payment.facade.ts
 * description: file responsible for the definition of the payment facade.
 * data: 11/19/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface from "./payment.facade.interface";
import { PaymentoFacadeInterfaceInputDto, PaymentFacadeInterfaceOutputDto } from "./payment.facade.interface.dto";

export default class PaymentFacade implements PaymentFacadeInterface {

  constructor(private processPaymentUseCase: UseCaseInterface) { }

  process(input: PaymentoFacadeInterfaceInputDto): Promise<PaymentFacadeInterfaceOutputDto> {
    return this.processPaymentUseCase.execute(input);
  }

}