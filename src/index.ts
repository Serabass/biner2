import { TYPES } from "./types";

export interface BinerTypeField {
  name: string;
  type: string;
}

export interface BinerScalarType {
  typename: string;
}

export interface BinerType {
  fields: BinerTypeField[];
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
          var res = this.read(field.type);
          result[field.name] = res;
        }
      }
    }

    return result;
  }

  private isInternalType(typename: string) {
    return typename in TYPES;
  }
}
