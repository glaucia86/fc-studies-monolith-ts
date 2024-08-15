/**
 * file: src/modules/store-catalog/usecase/find-product/find-product.dto.ts
 * description: file responsible for the definition of the `findProduct` input dto.
 * data: 08/15/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export interface FindProductInputDto {
  id: string;
}

export interface FindProductOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}