/**
 * file: src/modules/product-adm/gateway/product.gateway.ts
 * description: file responsible for the definition of the product gateway.
 * data: 07/09/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase {
  private _productRepository: ProductGateway;

  constructor(_productRepository: ProductGateway) {
    this._productRepository = _productRepository;
  }

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    };

    const product = new Product(props);
    this._productRepository.add(product);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}