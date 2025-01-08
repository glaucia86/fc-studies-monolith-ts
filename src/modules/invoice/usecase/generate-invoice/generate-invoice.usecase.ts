/**
 * file: src/modules/invoice/usecase/generated-invoice/generate-invoice.usecase.ts
 * description: file responsible for the definition of the generate invoice usecase.
 * data: 11/26/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Address from "../../domain/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase {
  private _clientRepository: InvoiceGateway;

  constructor(clientRepository: InvoiceGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      }),
      items: input.items
    }

    const invoice = new Invoice(props)
    await this._clientRepository.generate(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items,
      total: invoice.items.reduce((prev, curr) => prev + curr.price, 0),
    }
  }
}
