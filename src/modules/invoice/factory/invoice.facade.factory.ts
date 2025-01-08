import TransactionRepository from "../../payment/repository/transaction.repository";
import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import FindInvoiceUseCase from "../usecase/find/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacadeInterface {
    const repository = new TransactionRepository();
    const find = new FindInvoiceUseCase(repository);
    const create = new GenerateInvoiceUseCase(repository);
    const facade = new InvoiceFacade({ create: create, find: find });
    return facade;
  }
}

