/**
 * file: src/modules/client-adm/usecase/find-client/find-client.usecase.dto.ts
 * description: file responsible for the implementation of the dto of the find client use case.
 * data: 08/27/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
  id: new Id('1'),
  name: 'Glaucia Lemos',
  email: 'glaucia@email.com',
  address: 'Rua dos Bobos, 0',
});

const MockRepository = () => {
  return {
    add: jest.fn().mockReturnValue(Promise.resolve()),
    findById: jest.fn().mockReturnValue(Promise.resolve(client)),
  };
};

describe('Find Client Adm UseCase Unit Test', () => {
  it('should find a client by id', async () => {
    const clientRepository = MockRepository();
    const useCase = new FindClientUseCase(clientRepository);

    const input = {
      id: '1'
    };

    const result = await useCase.execute(input);

    expect(clientRepository.findById).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address).toEqual(client.address);
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  });
});