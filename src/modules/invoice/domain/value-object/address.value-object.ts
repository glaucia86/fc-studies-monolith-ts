/**
 * file: src/modules/invoice/domain/value-object/address.value-object.ts
 * description: file responsible for the definition of the address value object.
 * data: 11/25/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import ValueObject from "../../../@shared/domain/value-object/value-object.interface";

type AddressProps = {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
}

export class Address implements ValueObject {
  private _street: string = ""
  private _number: string = ""
  private _complement: string = ""
  private _city: string = ""
  private _state: string = ""
  private _zipCode: string = ""

  constructor(props: AddressProps) {
    this._street = props.street;
    this._number = props.number;
    this._complement = props.complement;
    this._city = props.city;
    this._state = props.state
    this._zipCode = props.zipCode

  }

  get street(): string {
    return this._street
  }

  get number(): string {
    return this._number
  }

  get complement(): string {
    return this._complement
  }

  get city(): string {
    return this._city
  }

  get state(): string {
    return this._state
  }

  get zipCode(): string {
    return this._zipCode
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required")
    }

    if (this._number.length === 0) {
      throw new Error("Number is required")
    }

    if (this._complement.length === 0) {
      throw new Error("Complement is required")
    }

    if (this._city.length === 0) {
      throw new Error("City is required")
    }

    if (this._state.length === 0) {
      throw new Error("State is required")
    }

    if (this._zipCode.length === 0) {
      throw new Error("Zip code is required")
    }
  }
}