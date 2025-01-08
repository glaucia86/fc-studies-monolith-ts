/**
 * file: src/modules/invoice/usecase/find-invoice/find-invoice.usecase.ts
 * description: file responsible for the definition of the find invoice use case spec.
 * data: 11/25/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "./find-invoice.dto";


export default class GenerateInvoiceUseCase {
    private _clientRepository: InvoiceGateway;

    constructor(clientRepository: InvoiceGateway) {
        this._clientRepository = clientRepository;
    }

    async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {
        const result = await this._clientRepository.find(input.id);

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            address: result.address,
            items: result.items,
            total: result?.items?.reduce((prev, curr) => prev + curr.price, 0),
            createdAt: result.createdAt,
        }
    }
}