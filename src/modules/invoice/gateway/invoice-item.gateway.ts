/**
 * file: src/modules/invoice/gateway/invoice-items.gateway.ts
 * description: file responsible for the definition of the invoice items gateway.
 * data: 11/25/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import InvoiceItem from "../domain/product.entity";

export default interface InvoiceItemsGateway {
  generate(invoiceItem: InvoiceItem): Promise<void>;
  find(id: string): Promise<InvoiceItem>;
}