/**
 * file: src/modules/product-adm/repository/product.repository.ts
 * description: file responsible for the definition of the product repository.
 * data: 08/12/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
  async addProduct(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  findProductById(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }

}