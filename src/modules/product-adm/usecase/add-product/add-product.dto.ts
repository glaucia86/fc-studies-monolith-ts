/**
 * file: src/modules/product-adm/usecase/add-product/add-product.dto.ts
 * description: file responsible for the definition of the addProduct input dto.
 * data: 07/01/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export interface AddProductInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface AddProductOutputDto {
  id: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}