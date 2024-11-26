/**
 * file: src/modules/invoice/repository/invoice-item.model.ts
 * description: file responsible for the definition of the invoice item model.
 * data: 11/26/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
  tableName: 'invoice_items',
  timestamps: false
})
export class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare price: number

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false, field: 'invoice_id' })
  declare invoiceId: string
}