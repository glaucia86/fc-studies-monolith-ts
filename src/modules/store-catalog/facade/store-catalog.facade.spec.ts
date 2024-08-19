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
})