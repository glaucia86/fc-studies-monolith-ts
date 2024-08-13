/**
 * file: src/modules/@shared/domain/entity/base.entity.ts
 * description: file responsible for the definition of the base entity.
 * data: 07/01/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../value-object/id.value-object";

export default class BaseEntity {
  private _id: Id;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(id?: Id, createdAt?: Date, updatedAt?: Date) {
    this._id = id || new Id();
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  get id(): Id {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }
}