/**
 * file: src/modules/client-adm/usecase/add-client/add-client.usecase.ts
 * description: file responsible for the definition of the add client use case dto.
 * data: 08/27/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export interface AddClientInputDto {
  id?: string;
  name: string;
  email: string;
  address: string;
  document: string;
}

export interface AddClientOutputDto {
  id: string
  name: string;
  email: string;
  document: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}