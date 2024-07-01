/**
 * file: src/modules/product-adm/usecase/add-product/add-product.dto.ts
 * description: file responsible for the definition of the addProduct input dto.
 * data: 07/01/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export interface AddProductInputDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}