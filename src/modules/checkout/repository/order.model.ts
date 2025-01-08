/**
 * file: src/modules/checkout/repository/order.model.ts
 * description: file responsible for the definition of the order model.
 * data: 01/07/2025
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";

@Table({
  tableName: 'orders',
  timestamps: false
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare status: string;

  @Column({ allowNull: false })
  declare invoiceId: string;

  @Column({ allowNull: false, type: DataType.JSON })
  declare client: Client;

  @Column({ allowNull: false, type: DataType.JSON })
  declare products: Product[];
}
