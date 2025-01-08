/**
 * file: src/modules/invoice/repository/invoice.repository.spec.ts
 * description: file responsible for the definition of the invoice repository spec.
 * data: 11/26/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Address from "../domain/value-object/address.value-object";
import InvoiceRepository from "./invoice.repository";

describe("Invoice Repository test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([InvoiceModel])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create an invoice', async () => {
    const invoice = new Invoice({
      id: new Id('1'),
      name: 'Invoice 1',
      document: 'Document 1',
      address: new Address({
        street: "Rua 123",
        number: "99",
        complement: "Endereço",
        city: "Rio de Janeiro",
        state: "RJ",
        zipCode: "00000-000"
      }),
    })

    const repository = new InvoiceRepository();
    const createdInvoice = await repository.generate(invoice)

    const result = await InvoiceModel.findOne({ where: { id: '1' } })

    expect(result).toBeDefined()
    expect(result.id).toEqual(invoice.id.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.document).toEqual(invoice.document)
    expect(result.street).toEqual(invoice.address.street)
    expect(result.number).toEqual(invoice.address.number)
    expect(result.complement).toEqual(invoice.address.complement)
    expect(result.city).toEqual(invoice.address.city)
    expect(result.state).toEqual(invoice.address.state)
    expect(result.zipCode).toEqual(invoice.address.zipCode)
    expect(result.createdAt).toEqual(invoice.createdAt)
    expect(result.updatedAt).toEqual(invoice.updatedAt)
  })

  it('should find an invoice', async () => {
    const invoice = await InvoiceModel.create({
      id: '1',
      name: 'Invoice 1',
      document: 'Document 1',
      street: "Rua 123",
      number: "99",
      complement: "Endereço",
      city: "Rio de Janeiro",
      state: "RJ",
      zipCode: "00000-000",
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const repository = new InvoiceRepository();
    const result = await repository.find('1')

    expect(result).toBeDefined()
    expect(result.id.id).toEqual(invoice.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.document).toEqual(invoice.document)
    expect(result.address.street).toEqual(invoice.street)
    expect(result.address.number).toEqual(invoice.number)
    expect(result.address.complement).toEqual(invoice.complement)
    expect(result.address.city).toEqual(invoice.city)
    expect(result.address.state).toEqual(invoice.state)
    expect(result.address.zipCode).toEqual(invoice.zipCode)
    expect(result.createdAt).toEqual(invoice.createdAt)
    expect(result.updatedAt).toEqual(invoice.updatedAt)
  })
})