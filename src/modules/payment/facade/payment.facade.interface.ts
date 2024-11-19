/**
 * file: src/modules/payment/facade/payment.facade.interface.ts
 * description: file responsible for the definition of the facade interface.
 * data: 11/19/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { PaymentFacadeInterfaceOutputDto, PaymentoFacadeInterfaceInputDto } from "./payment.facade.interface.dto";

export default interface PaymentFacadeInterface {
  process(input: PaymentoFacadeInterfaceInputDto): Promise<PaymentFacadeInterfaceOutputDto>;
}
