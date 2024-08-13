/**
 * file: src/modules/product-adm/usecase/add-product/add-product.usecase.spec.ts
 * description: file responsible for the implementation of the addProduct use case test.
 * data: 07/01/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import AddProductUseCase from "./add-product.usecase";

const MockProductRepository = () => {
  return {
    add: jest.fn(),
    findById: jest.fn(),
  };
};

describe("Add Product usecase unit test", () => {
  it("should add a product", async () => {
    const productRepository = MockProductRepository();
    const usecase = new AddProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };

    const result = await usecase.execute(input);

    expect(productRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined;
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.purchasePrice).toBe(input.purchasePrice);
    expect(result.stock).toBe(input.stock);
  });
});