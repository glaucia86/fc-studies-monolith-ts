/**
 * file: src/modules/store-catalog/repository/product.repository.ts
 * description: file responsible for the definition of the product repository.
 * data: 08/15/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";


export default class ProductRepository implements ProductGateway {
  async findById(id: string): Promise<Product> {
    const product = await ProductModel.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }

  findAll(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }


}