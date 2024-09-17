/**
 * file: src/modules/client-adm/facade/client-adm.facade.ts
 * description: file responsible for the definition of the client admin facade.
 * data: 09/16/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutPutDto } from "./client-adm.facade.interface";

export interface UseCaseProps {
  findClientUseCase: UseCaseInterface;
  addClientUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findClientUseCase: UseCaseInterface;
  private _addClientUseCase: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._findClientUseCase = useCaseProps.findClientUseCase;
    this._addClientUseCase = useCaseProps.addClientUseCase;
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addClientUseCase.execute(input);
  }

  async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutPutDto> {
    return await this._findClientUseCase.execute(input);
  }
}