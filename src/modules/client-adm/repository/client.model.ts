/**
 * file: src/modules/client-adm/repository/client.model.ts
 * description: file responsible for the definition of the client model interface.
 * data: 09/02/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";

@Table({
  tableName: "clients",
  timestamps: false,
})
export class ClientModel extends Model {

  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare email: string;

  @Column({ allowNull: false })
  declare address: string;

  @Column({ allowNull: false })
  declare document: string;

  @Column({ allowNull: false })
  declare createdAt: Date;

  @Column({ allowNull: false })
  declare updatedAt: Date;
}