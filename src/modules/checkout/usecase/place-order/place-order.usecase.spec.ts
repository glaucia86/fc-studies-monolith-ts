/**
 * file: src/modules/checkout/usecase/place-order/place-order.usecase.spec.ts
 * description: file responsible for the definition of the place order use case test.
 * data: 12/15/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";

describe('PlaceOrder UseCase unit Test', () => {
  describe('execute method', () => {
    // buscar o cliente. Caso não encontre -> client not found
    it('should throw an error when client not found', async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
      };

      //@ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase();
      //@ts-expect-error - force set clientFacade
      placeOrderUseCase['_clientFacade'] = mockClientFacade;

      const input: PlaceOrderInputDto = {
        clientId: '0',
        products: [],
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error('Client not found'));
    })
  })
})