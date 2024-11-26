/**
 * file: src/modules/invoice/usecase/generated-invoice/generate-invoice.usecase.spec.ts
 * description: file responsible for the definition of the generate invoice dto.
 * data: 11/25/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn(),
  };
};

describe('Generate Invoice Use Case Unit Test', () => {
  it('should generate an invoice', async () => {
    const invoiceRepository = MockRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);

    const inputInvoice = {
      name: 'Invoice-01',
      document: 'Document-01',
      street: 'Street-01',
      number: '123',
      complement: 'Apt 10',
      city: 'City-01',
      state: 'State-01',
      zipCode: '12345-678',
      items: [
        { id: '1', name: 'Item-01', price: 100 },
      ],
    };

    const result = await generateInvoiceUseCase.execute(inputInvoice);

    expect(invoiceRepository.generate).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(inputInvoice.name);
    expect(result.document).toBe(inputInvoice.document);
    expect(result.street).toBe(inputInvoice.street);
    expect(result.number).toBe(inputInvoice.number);
    expect(result.complement).toBe(inputInvoice.complement);
    expect(result.city).toBe(inputInvoice.city);
    expect(result.state).toBe(inputInvoice.state);
    expect(result.zipCode).toBe(inputInvoice.zipCode);
    expect(result.items[0].id).toBe(inputInvoice.items[0].id);
    expect(result.items[0].name).toBe(inputInvoice.items[0].name);
    expect(result.items[0].price).toBe(inputInvoice.items[0].price);
  });
});

