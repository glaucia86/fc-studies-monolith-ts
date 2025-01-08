import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/facade.factory";
import { InvoiceModel } from "../repository/invoice.model";
import Address from "../domain/value-object/address.value-object";


describe('Invoice Facade Test', () => {

  let sequelize: Sequelize

  beforeEach(async () => {

    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([InvoiceModel])
    await sequelize.sync()
  });

  afterEach(async () => {
    await sequelize.close()
  });

  it('should generate an invoice', async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
      name: 'Client Name',
      document: 'Client Document',
      street: 'Main St',
      number: '100',
      complement: 'Apt 10',
      city: 'Anytown',
      state: 'Anystate',
      zipCode: '12345-678',
      items: [
        {
          id: '1',
          name: 'Product 1',
          price: 50,
        },
        {
          id: '2',
          name: 'Product 2',
          price: 100,
        },
      ],
    };

    const invoiceGenerated = await invoiceFacade.generate(input);
    const invoiceOnDatabase = await InvoiceModel.findOne({
      where: { id: invoiceGenerated.id },
    });

    expect(invoiceGenerated.id).toBeDefined();
    expect(invoiceOnDatabase.id).toBeDefined();
    expect(invoiceGenerated.name).toBe(input.name);
    expect(invoiceGenerated.document).toEqual(input.document);
    expect(invoiceGenerated.items).toEqual(input.items);
    expect(invoiceGenerated.total).toEqual(150);

    expect(invoiceGenerated.street).toEqual(input.street);
    expect(invoiceGenerated.number).toEqual(input.number);
    expect(invoiceGenerated.complement).toEqual(input.complement);
    expect(invoiceGenerated.city).toEqual(input.city);
    expect(invoiceGenerated.state).toEqual(input.state);
    expect(invoiceGenerated.zipCode).toEqual(input.zipCode);
  });

  it('should find an invoice', async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const invoiceCreated = await InvoiceModel.create({
      id: '1',
      name: 'Invoice-01',
      document: 'Document-01',
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        {
          id: '1',
          name: 'Product 1',
          price: 50,
        },
        {
          id: '2',
          name: 'Product 2',
          price: 100,
        }
      ],
      street: 'Main St',
      number: '100',
      complement: 'Apt 10',
      city: 'Anytown',
      state: 'Anystate',
      zipCode: '12345-678',
    });

    const result = await invoiceFacade.findInvoice({ id: '1' });

    expect(result.id).toEqual(invoiceCreated.id);
    expect(result.name).toEqual(invoiceCreated.name);
    expect(result.document).toEqual(invoiceCreated.document);

    expect(result.createdAt.toString()).toEqual(invoiceCreated.createdAt.toString());

    expect(result.total).toEqual(150);

    expect(result.items.length).toEqual(2);

    expect(result.address).toEqual(
      new Address({
        street: 'street',
        number: 'number',
        complement: 'complement',
        city: 'city',
        state: 'state',
        zipCode: 'zipCode',
      })
    );
  });
});