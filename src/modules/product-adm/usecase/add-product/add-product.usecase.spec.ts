/**
 * file: src/modules/product-adm/usecase/add-product/add-product.usecase.spec.ts
 * description: file responsible for the implementation of the addProduct use case test.
 * data: 07/01/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

const MockProductRepository = () => {
  return {
    addProduct: jest.fn(),
    find: jest.fn(),
  }
};

describe("Add Product Use Case Unit Tests", () => {

  it("should add a product", () => {
    const productRepository = MockProductRepository();
    const useCase = new AddProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      description: "Description 1",
      price: 100,
      stock: 10,
    }

    useCase.execute(input);
  });
});