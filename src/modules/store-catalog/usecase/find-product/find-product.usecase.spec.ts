/**
 * file: src/modules/store-catalog/usecase/find-product/find-product.usecase.spec.ts
 * description: file responsible for the definition of the findProduct usecase test.
 * data: 08/15/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  salesPrice: 100,
});

const MockProductRepository = () => {
  return {
    findAll: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(product)),
  }
}

describe("Find Product UseCase Unit Test", () => {
  it("should get product by id", async () => {
    const productRepository = MockProductRepository();
    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: '1',
    };

    const result = await useCase.execute(input);

    expect(productRepository.findById).toHaveBeenCalled();
    expect(result.id).toBe('1');
    expect(result.name).toBe('Product 1');
    expect(result.description).toBe('Product 1 description');
    expect(result.salesPrice).toBe(100);
  });
});
