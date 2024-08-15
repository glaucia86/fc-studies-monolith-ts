/**
 * file: src/modules/store-catalog/repository/product.repository.spec.ts
 * description: file responsible for the definition of the product repository.
 * data: 08/15/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("ProductRepository Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  it("should find a product", async () => {

    ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 100,
    });

    ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Product 2 description",
      salesPrice: 200,
    });

    const productRepository = new ProductRepository();
    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].id).toEqual("1");
    expect(products[0].name).toEqual("Product 1");
    expect(products[0].description).toEqual("Product 1 description");
    expect(products[0].salesPrice).toEqual(100);

    expect(products[0].id).toEqual("2");
    expect(products[0].name).toEqual("Product 2");
    expect(products[0].description).toEqual("Product 2 description");
    expect(products[0].salesPrice).toEqual(200);
  });
});