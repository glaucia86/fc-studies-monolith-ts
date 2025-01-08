/**
 * file: src/modules/@shared/domain/value-object/id.value-object.ts
 * description: file responsible for the definition of the id value object.
 * data: 07/01/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import ValueObject from "./value-object.interface";
import { v4 as uuidv4 } from "uuid";

export default class Id implements ValueObject {
  private _id: string;

  constructor(id?: string) {
    this._id = id || uuidv4();
  }

  get id(): string {
    return this._id;
  }
}

