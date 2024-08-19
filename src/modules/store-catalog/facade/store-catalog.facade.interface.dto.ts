/**
 * file: src/modules/store-catalog/facade/store-catalog.facade.interface.dto.ts
 * description: file responsible for the definition of the store-catalog facade interface dto.
 * data: 08/19/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export interface FindStoreCatalogFacadeInputDto {
  id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export default interface StoreCatalogFacadeInterface {
  findById(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>;
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}

