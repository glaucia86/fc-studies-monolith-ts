/**
 * file: src/modules/client-adm/usecase/add-client/add-client.usecase.spec.ts
 * description: file responsible for the implementation of the add client use case test.
 * data: 08/27/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    findById: jest.fn(),
  };
};

describe('Add Client Adm UseCase unit Test', () => {
  it('should add a new client', async () => {
    const clientRepository = MockRepository();
    const useCase = new AddClientUseCase(clientRepository);

    const input = {
      name: 'Glaucia Lemos',
      email: 'glaucia@email.com',
      address: '123 Main St',
    };

    const result = await useCase.execute(input);

    expect(clientRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined;
    expect(result.name).toBe(input.name)
    expect(result.email).toBe(input.email)
    expect(result.address).toBe(input.address)
  });
});