/**
 * file: src/modules/checkout/usecase/place-order/place-order.usecase.ts
 * description: file responsible for the definition of the place order use case.
 * data: 12/01/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
  constructor() { }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    // buscar o cliente. Caso não encontre -> client not found
    // buscar os produtos. Caso não encontre -> product not found
    // calcular o total
    // recuperar os produtos

    //criar o objeto do client
    // criar o objeto do order(client, products)
    // processpayment -> paymentfacade.process (orderid, amount)
    
    // caso pagamento seja aprovado -> gerar invoice
    // caso pagamento seja aprovado -> atualizar o status do pedido para approved
    // retornar dto com id, invoiceId, status, total, products


    return {
      id: '1',
      invoiceId: '',
      status: '',
      total: 0,
      products: [],
    }
  }
}