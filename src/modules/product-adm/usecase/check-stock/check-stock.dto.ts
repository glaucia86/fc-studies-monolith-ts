/**
 * file: src/modules/product-adm/usecase/check-stock/check-stock.dto.ts
 * description: file responsible for the definition of the checkStock input dto.
 * data: 08/13/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export interface CheckStockInputDto {
  productId: string
}

export interface CheckStockOutputDto {
  productId: string
  stock: number
}