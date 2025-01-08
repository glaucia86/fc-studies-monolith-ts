/**
 * file: src/modules/invoice/usecase/find-invoice/find-invoice.usecase.spec.ts
 * description: file responsible for the definition of the find invoice use case spec.
 * data: 11/25/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Address } from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";

import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
  id: new Id('1'),
  name: 'invoice 1',
  document: 'document 1',
  address: new Address(
    'street 1',
    'number 1',
    'complemente 1',
    'city 1',
    'stata 1',
    'zip-code-1',
  ),
  items: [
    {
      id: new Id('uuid-item-1'),
      name: 'item 1',
      price: 100
    },
    {
      id: new Id('uuid-item-1'),
      name: 'item 1',
      price: 150
    }
  ].map(({ id, name, price }) => new InvoiceItem({ id, name, price })),
})

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  }
};

describe("find Invoice Usecase unit test", () => {
  it("should find a Invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = { id: '1' }
    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.address).toEqual(invoice.address);
    expect(result.items).toEqual(invoice.items);
    expect(result.total).toEqual(250);
    expect(result.createdAt).toEqual(invoice.createdAt);
  });
});