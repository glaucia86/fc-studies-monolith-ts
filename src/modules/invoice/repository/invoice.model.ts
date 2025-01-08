/**
 * file: src/modules/invoice/repository/invoice.model.ts
 * description: file responsible for the definition of the invoice model.
 * data: 11/26/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

interface ProductData {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: 'invoice',
  timestamps: false
})
export class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare document: string

  @Column({ allowNull: false })
  declare street: string

  @Column({ allowNull: false })
  declare number: string

  @Column({ allowNull: true })
  declare complement: string

  @Column({ allowNull: false })
  declare city: string

  @Column({ allowNull: false })
  declare state: string

  @Column({ allowNull: false })
  declare zipCode: string


  @Column({ allowNull: true, type: DataType.JSON })
  declare items: ProductData[];

  @Column({ allowNull: false })
  declare createdAt: Date

  @Column({ allowNull: false })
  declare updatedAt: Date
}    