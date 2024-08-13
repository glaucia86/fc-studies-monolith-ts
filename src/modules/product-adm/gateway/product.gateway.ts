/**
 * file: src/modules/product-adm/gateway/product.gateway.ts
 * description: file responsible for the definition of the product gateway.
 * data: 07/01/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Product from "../domain/product.entity";

export default interface ProductGateway {
  add(product: Product): Promise<void>;
  findById(id: string): Promise<Product>;
}
