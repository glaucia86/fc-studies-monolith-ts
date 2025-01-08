/**
 * file: src/modules/invoice/domain/invoice-items.entity.ts
 * description: file responsible for the definition of the invoice items entity.
 * data: 11/25/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type InvoiceItemProps = {
  id: Id;
  name: string;
  price: number;
  createdAt?: Date,
  updatedAt?: Date
}

export default class InvoiceItem extends BaseEntity {

  private _name: string;
  private _price: number;

  constructor(props: InvoiceItemProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._price = props.price;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}