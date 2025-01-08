/**
 * file: src/modules/invoice/usecase/find-invoice/find-invoice.dto.ts
 * description: file responsible for the definition of the find invoice dto.
 * data: 11/25/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export interface FindInvoiceUseCaseInputDTO {
  id: string
}

export interface FindInvoiceUseCaseOutputDTO {
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdAt: Date;
}