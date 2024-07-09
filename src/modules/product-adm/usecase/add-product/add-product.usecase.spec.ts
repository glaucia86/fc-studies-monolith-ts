/**
 * file: src/modules/product-adm/usecase/add-product/add-product.usecase.spec.ts
 * description: file responsible for the implementation of the addProduct use case test.
 * data: 07/01/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import AddProductUseCase from "./add-product.usecase";

const MockProductRepository = () => {
  return {
    addProduct: jest.fn(),
    findProductById: jest.fn(),
  }
};

describe("Add Product Use Case Unit Tests", () => {

  it("should add a product", async () => {
    const productRepository = MockProductRepository();
    const useCase = new AddProductUseCase(productRepository);

    const input = {
      name: "Product Test",
      description: "Product Description",
      purchasePrice: 10.00,
      stock: 10,
    };

    const result = await useCase.execute(input);

    expect(productRepository.addProduct).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.purchasePrice).toBe(input.purchasePrice);
    expect(result.stock).toBe(input.stock);
  })
});