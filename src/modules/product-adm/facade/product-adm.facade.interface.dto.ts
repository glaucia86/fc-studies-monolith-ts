/**
 * file: src/modules/product-adm/facade/product-admin.facade.interface.dto.ts
 * description: file responsible for the definition of the product admin facade interface.
 * data: 08/13/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export interface AddProductFacadeInterfaceInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface CheckStockProductFacadeInterfaceInputDto {
  productId: string;
}

export interface CheckStockProductFacadeInterfaceOutputDto {
  productId: string;
  stock: number;
}