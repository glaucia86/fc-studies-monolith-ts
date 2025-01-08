/**
 * file: src/modules/store-catalog/usecase/find-all-products/find-products.dto.ts
 * description: file responsible for the definition of the findProduct input dto.
 * data: 08/14/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export interface FindAllProductsDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}
