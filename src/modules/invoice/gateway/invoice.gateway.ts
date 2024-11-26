/**
 * file: src/modules/invoice/gateway/invoice.gateway.ts
 * description: file responsible for the definition of the invoice gateway.
 * data: 11/25/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Invoice from "../domain/invoice.entity";

export default interface InvoiceGateway {
  generate(invoice: Invoice): Promise<void>;
  find(id: string): Promise<Invoice>;
}