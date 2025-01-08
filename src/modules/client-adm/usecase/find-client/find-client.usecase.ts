/**
 * file: src/modules/client-adm/usecase/find-client/find-client.usecase.ts
 * description: file responsible for the implementation of the dto of the find client use case.
 * data: 08/27/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutPutDto } from "./find-client.usecase.dto";

export default class FindClientUseCase {
  private _clientRepository: ClientGateway;

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: FindClientInputDto): Promise<FindClientOutPutDto> {
    const client = await this._clientRepository.findById(input.id);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      document: client.document,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}