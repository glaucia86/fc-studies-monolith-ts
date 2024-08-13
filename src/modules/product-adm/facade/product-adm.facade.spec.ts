/**
 * file: src/modules/product-adm/facade/product-admin.facade.spec.ts
 * description: file responsible for the definition of the product admin facade.
 * data: 08/13/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdminFacade from "./product-adm.facade";

describe('Product Adm Facade Test', () => {
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

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const productFacade = new ProductAdminFacade({
      addUseCase: addProductUseCase,
      stockUseCase: undefined,
    });

    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      stock: 10,
    };

    await productFacade.addProduct(input);

    const product = await ProductModel.findOne({
      where: {
        id: "1"
      }
    });

    expect(product).toBeDefined();
    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.purchasePrice).toBe(input.purchasePrice);
    expect(product.stock).toBe(input.stock);
  });
});