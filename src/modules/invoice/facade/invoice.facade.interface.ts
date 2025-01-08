/*import { FindInvoiceFacadeInterfaceInputDto, FindInvoiceFacadeInterfaceOutputDto, GenerateInvoiceFacadeInterfaceInputDto, GenerateInvoiceFacadeInterfaceOutputDto } from "./invoice.facade.interface.dto";

export default interface InvoiceFacadeInterface {
  generate(input: GenerateInvoiceFacadeInterfaceInputDto): Promise<GenerateInvoiceFacadeInterfaceOutputDto>;

  find(input: FindInvoiceFacadeInterfaceInputDto): Promise<FindInvoiceFacadeInterfaceOutputDto>;
}*/

export interface FindInvoiceFacadeInterfaceInputDto {
  id: string;
}

export interface FindInvoiceFacadeInterfaceOutputDto {
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

export interface GenerateInvoiceFacadeInterfaceInputDto {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface GenerateInvoiceFacadeInterfaceOutputDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
}

export interface InvoiceFacadeInterface {
  generateInvoice(input: GenerateInvoiceFacadeInterfaceInputDto): Promise<GenerateInvoiceFacadeInterfaceOutputDto>;
  findInvoice(input: FindInvoiceFacadeInterfaceInputDto): Promise<FindInvoiceFacadeInterfaceOutputDto>;
}