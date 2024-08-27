/**
 * file: src/modules/client-adm/usecase/find-client/find-client.usecase.dto.ts
 * description: file responsible for the implementation of the dto of the find client use case.
 * data: 08/27/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export interface FindClientInputDto {
  id: string;
}

export interface FindClientOutPutDto {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}