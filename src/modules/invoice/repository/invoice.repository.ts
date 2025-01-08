/**
 * file: src/modules/invoice/repository/invoice.repository.ts
 * description: file responsible for the definition of the invoice repository.
 * data: 11/26/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Address from "../domain/value-object/address.value-object";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(entity: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: entity.id.id,
      name: entity.name,
      document: entity.document,
      street: entity.address.street,
      number: entity.address.number,
      complement: entity.address.complement,
      city: entity.address.city,
      state: entity.address.state,
      zipcode: entity.address.zipCode,
      items: entity.items,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }

  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({ where: { id } })

    if (!invoice) {
      throw new Error("Invoice not found")
    }

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address({
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipCode
      }),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    });
  }
}
