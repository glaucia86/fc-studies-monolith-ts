/**
 * file: src/modules/invoice/usecase/generate-invoice/generate-invoice.dto.ts
 * description: file responsible for the definition of the generate invoice dto.
 * data: 11/26/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import InvoiceItem from "../../domain/product.entity";

export interface GenerateInvoiceUseCaseInputDto {
  id?: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: InvoiceItem[];
}

export interface GenerateInvoiceUseCaseOutputDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: InvoiceItem[];
  total: number;
}