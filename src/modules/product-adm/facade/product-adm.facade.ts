/**
 * file: src/modules/product-adm/facade/product-admin.facade.ts
 * description: file responsible for the definition of the product admin facade.
 * data: 08/13/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdminFacadeInterface from "./product-adm.facade.interface";
import { AddProductFacadeInterfaceInputDto, CheckStockProductFacadeInterfaceInputDto, CheckStockProductFacadeInterfaceOutputDto } from "./product-adm.facade.interface.dto";

export interface UseCasesProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdminFacadeInterface {

  private _addUseCase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;

  constructor(useCasesProps: UseCasesProps) {
    this._addUseCase = useCasesProps.addUseCase;
    this._checkStockUseCase = useCasesProps.stockUseCase;
  }

  addProduct(input: AddProductFacadeInterfaceInputDto): Promise<void> {
    return this._addUseCase.execute(input);
  }

  checkStock(input: CheckStockProductFacadeInterfaceInputDto): Promise<CheckStockProductFacadeInterfaceOutputDto> {
    return this._checkStockUseCase.execute(input);
  }
}