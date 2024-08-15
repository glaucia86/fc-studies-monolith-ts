/**
 * file: src/modules/store-catalog/usecase/find-product/find-product.usecase.ts
 * description: file responsible for the definition of the findProduct usecase test.
 * data: 08/15/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase {
  constructor(private readonly productRepository: ProductGateway) { }

  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this.productRepository.findById(input.id);
    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  };
}