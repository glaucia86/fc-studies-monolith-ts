/**
 * file: src/modules/invoice/repository/invoice-item.repository.ts
 * description: file responsible for the definition of the invoice item repository.
 * data: 11/26/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../domain/invoice-item.entity";
import InvoiceItemsGateway from "../gateway/invoice-item.gateway";
import { InvoiceItemModel } from "./invoice-item.model";

export default class InvoiceItemRepository implements InvoiceItemsGateway {
  async generate(invoiceItem: InvoiceItem): Promise<void> {
    await InvoiceItemModel.create({
      id: invoiceItem.id.id,
      name: invoiceItem.name,
      price: invoiceItem.price,
    });
  }

  async find(id: string): Promise<InvoiceItem> {
    const invoiceItem = await InvoiceItemModel.findOne({
      where: { id },
    })

    if (!invoiceItem) {
      throw new Error(`Invoice Item with id ${id} not found`)
    }

    return new InvoiceItem({
      id: new Id(invoiceItem.id),
      name: invoiceItem.name,
      price: invoiceItem.price
    })
  }
}
