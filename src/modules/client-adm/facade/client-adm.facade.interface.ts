/**
 * file: src/modules/client-adm/facade/client-adm.facade.interface.ts
 * description: file responsible for the definition of the client admin facade interface.
 * data: 09/16/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export interface AddClientFacadeInputDto {
  id?: string;
  name: string;
  email: string;
  address: string;
  document: string;
}

export interface FindClientFacadeInputDto {
  id: string;
}

export interface FindClientFacadeOutPutDto {
  id: string;
  name: string;
  email: string;
  address: string;
  document: string;
  createdAt: Date;
  updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
  add(input: AddClientFacadeInputDto): Promise<void>
  find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutPutDto>
}