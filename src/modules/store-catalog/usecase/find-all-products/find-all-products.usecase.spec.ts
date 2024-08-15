/**
 * file: src/modules/store-catalog/usecase/find-all-products/find-products.usecase.spec.ts
 * description: file responsible for the implementantion of the findProduct usecase.
 * data: 08/14/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  salesPrice: 100,
});

const product2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  description: "Product 2 description",
  salesPrice: 200,
});

const MockProductRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
    findById: jest.fn(),
  };
};

describe("Find All Products usecase unit test", () => {
  it("should return all products", async () => {
    const productRepository = MockProductRepository();
    const usecase = new FindAllProductsUseCase(productRepository);

    const result = await usecase.execute();

    expect(productRepository.findAll).toHaveBeenCalled();
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe("1");
    expect(result.products[0].name).toBe("Product 1");
    expect(result.products[0].description).toBe("Product 1 description");
    expect(result.products[0].salesPrice).toBe(100);
    expect(result.products[1].id).toBe("2");
    expect(result.products[1].name).toBe("Product 2");
    expect(result.products[1].description).toBe("Product 2 description");
    expect(result.products[1].salesPrice).toBe(200);
  });
});