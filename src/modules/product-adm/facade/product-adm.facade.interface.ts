/**
 * file: src/modules/product-adm/facade/product-admin.facade.interface.ts
 * description: file responsible for the definition of the product admin facade interface.
 * data: 08/13/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { AddProductFacadeInterfaceInputDto, CheckStockProductFacadeInterfaceInputDto, CheckStockProductFacadeInterfaceOutputDto } from "./product-adm.facade.interface.dto";

export default interface ProductAdmFacadeInterface {
  addProduct(input: AddProductFacadeInterfaceInputDto): Promise<void>;
  checkStock(input: CheckStockProductFacadeInterfaceInputDto): Promise<CheckStockProductFacadeInterfaceOutputDto>;
}