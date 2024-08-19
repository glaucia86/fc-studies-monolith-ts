/**
 * file: src/modules/store-catalog/facade/store-catalog.facade.spec.ts
 * description: file responsible for the definition of the store-catalog facade test.
 * data: 08/19/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Sequelize } from "sequelize-typescript"
import ProductModel from "../repository/product.model"
import StoreCatalogFacadeFactory from "../factory/facade.factory"

describe("Store Catalog Facade test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {

    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  });

  it("should find a product", async () => {

    const facade = StoreCatalogFacadeFactory.create();

    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 10.90
    });

    const result = await facade.findById({ id: "1" });

    expect(result.id).toBe("1");
    expect(result.name).toBe("Product 1");
    expect(result.description).toBe("Product 1 description");
    expect(result.salesPrice).toBe(10.90);
  });

  it("should find all products", async () => {
    const facade = StoreCatalogFacadeFactory.create();

    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 10.90
    });

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Product 2 description",
      salesPrice: 15.90
    });

    const result = await facade.findAll();

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe("1");
    expect(result.products[0].name).toBe("Product 1");
    expect(result.products[0].description).toBe("Product 1 description");
    expect(result.products[0].salesPrice).toBe(10.90)
    expect(result.products[1].id).toBe("2");
    expect(result.products[1].name).toBe("Product 2");
    expect(result.products[1].description).toBe("Product 2 description");
    expect(result.products[1].salesPrice).toBe(15.90);
  })
})