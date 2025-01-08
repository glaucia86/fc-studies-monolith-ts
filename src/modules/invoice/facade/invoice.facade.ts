import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { FindInvoiceFacadeInterfaceInputDto, FindInvoiceFacadeInterfaceOutputDto, GenerateInvoiceFacadeInterfaceInputDto, GenerateInvoiceFacadeInterfaceOutputDto, InvoiceFacadeInterface } from "./invoice.facade.interface";

export interface UseCaseProps {
  generateInvoiceUseCase: UseCaseInterface;
  findInvoiceUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {

  private _generateInvoiceUseCase: UseCaseInterface;
  private _findInvoiceUseCase: UseCaseInterface;

  constructor({ generateInvoiceUseCase, findInvoiceUseCase }: UseCaseProps) {
    this._generateInvoiceUseCase = generateInvoiceUseCase;
    this._findInvoiceUseCase = findInvoiceUseCase;
  }
  generateInvoice(input: GenerateInvoiceFacadeInterfaceInputDto): Promise<GenerateInvoiceFacadeInterfaceOutputDto> {
    throw new Error("Method not implemented.");
  }
  findInvoice(input: FindInvoiceFacadeInterfaceInputDto): Promise<FindInvoiceFacadeInterfaceOutputDto> {
    throw new Error("Method not implemented.");
  }

  async generate(input: GenerateInvoiceFacadeInterfaceInputDto): Promise<GenerateInvoiceFacadeInterfaceOutputDto> {
    return await this._generateInvoiceUseCase.execute(input);
  }

  async find(input: FindInvoiceFacadeInterfaceInputDto): Promise<FindInvoiceFacadeInterfaceOutputDto> {
    return await this._findInvoiceUseCase.execute(input);
  }
}