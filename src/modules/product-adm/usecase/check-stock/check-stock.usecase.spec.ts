/**
 * file: src/modules/product-adm/usecase/check-stock/check-stock.usecase.spec.ts
 * description: file responsible for the definition of the checkStock test case.
 * data: 08/13/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Product 1 description',
  purchasePrice: 100,
  stock: 10,
});

const MockCheckStockRepository = () => {
  return {
    add: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(product)),
  }
}

describe("Check Stock UseCase Unit Test", () => {
  it("should get stock of the product", async () => {
    const productRepository = MockCheckStockRepository();
    const useCase = new CheckStockUseCase(productRepository);

    const input = {
      productId: '1',
    };

    const result = await useCase.execute(input);

    expect(productRepository.findById).toHaveBeenCalled();
    expect(result.productId).toBe('1');
    expect(result.stock).toBe(10);
  });
});