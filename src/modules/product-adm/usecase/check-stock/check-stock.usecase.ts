/**
 * file: src/modules/product-adm/usecase/check-stock/check-stock.usecase.ts
 * description: file responsible for the definition of the addProduct input dto.
 * data: 08/13/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase {
  private _productRepository: ProductGateway

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository
  }

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this._productRepository.findById(input.productId)
    return {
      productId: product.id.id,
      stock: product.stock
    }
  }

}