/**
 * file: src/modules/store-catalog/gateway/product.gateway.ts
 * description: file responsible for the definition of the product gateway.
 * data: 08/14/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Product from "../domain/product.entity";

export default interface ProductGateway {
  findAll(): Promise<Product[]>;
  find(id: string): Promise<Product>;
}