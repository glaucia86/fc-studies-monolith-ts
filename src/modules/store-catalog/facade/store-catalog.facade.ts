/**
 * file: src/modules/store-catalog/facade/store-catalog.facade.ts
 * description: file responsible for the definition of the product admin facade.
 * data: 08/19/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, {
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto
} from "./store-catalog.facade.interface.dto";

export interface UseCasesProps {
  findUseCase: FindProductUseCase;
  findAllUseCase: FindAllProductsUseCase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findUseCase: FindProductUseCase;
  private _findAllUseCase: FindAllProductsUseCase;

  constructor(useCaseProps: UseCasesProps) {
    this._findAllUseCase = useCaseProps.findAllUseCase;
    this._findUseCase = useCaseProps.findUseCase;
  }

  findById(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
    return this._findUseCase.execute(id);
  }
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return this._findAllUseCase.execute();
  }

}
