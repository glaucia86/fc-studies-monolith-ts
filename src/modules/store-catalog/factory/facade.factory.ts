/**
 * file: src/modules/store-catalog/facade/store-catalog.facade.ts
 * description: file responsible for the definition of the store-catalog facade.
 * data: 08/19/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);
    const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);

    const storeCatalogFacade = new StoreCatalogFacade({
      findUseCase: findProductUseCase,
      findAllUseCase: findAllProductsUseCase
    });

    return storeCatalogFacade;
  }
}