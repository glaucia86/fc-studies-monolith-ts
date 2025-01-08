import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/transaction.repository";
import FindInvoiceUseCase from "../usecase/find/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacadeInterface {
    const repository = new InvoiceRepository();
    const find = new FindInvoiceUseCase(repository);
    const create = new GenerateInvoiceUseCase(repository);
    const facade = new InvoiceFacade({ create: create, find: find });
    return facade;
  }
}

