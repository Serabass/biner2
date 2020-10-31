import { TYPES } from "./types";

export interface BinerTypeField {
  name: string;
  type: string;
}

export interface BinerArrayField {
  name: string;
  array: {
    of: string;
    length: number;
  }
}

export type BinerField = BinerTypeField | BinerArrayField;

export interface BinerScalarType {
  typename: string;
}

export interface BinerType {
  fields: BinerField[];
}

export interface BinerConfig {
  types: {[key: string]: BinerType | BinerScalarType};
}

export class Biner {
  public static MAIN_TYPE_NAME = '';

  private offset: number = 0;
  public constructor(public config: BinerConfig, public data: Buffer) {}

  public parse() {
    return this.read(Biner.MAIN_TYPE_NAME);
  }

  public read(typename: string): any {
    let result: any = {};
    if (this.isInternalType(typename)) {
      let t = TYPES[typename];
      let readResult = t.read(this.data, this.offset);
      this.offset += readResult.offset;
      return readResult.result;
    } else {
      let type = this.config.types[typename];
      let t: BinerType | BinerScalarType;
      if ((type as BinerScalarType).typename) {
        t = type as BinerScalarType;
        return this.read(t.typename);
      } else {
        let {fields} = type as BinerType;
    
        for (let field of fields) {
          if ((field as BinerArrayField).array) {
            let l = (field as BinerArrayField).array.length;
            let array = [];

            for (let i = 0; i < l; i++) {
              let res = this.read((field as BinerArrayField).array.of);
              array.push(res);
            }

            result[field.name] = array;
          } else {
            let res = this.read((field as BinerTypeField).type);
            result[field.name] = res;
          }
        }
      }
    }

    return result;
  }

  private isInternalType(typename: string) {
    return typename in TYPES;
  }
}
