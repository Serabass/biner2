import { Biner, BinerConfig, BinerType } from "../src";

describe("Struct tests", () => {
  it ('Nested struct', () => {
    var config: BinerConfig = {
      types: {
        '': {
          fields: [
            { name: 'struct', type: "Struct" },
          ]
        },
        Struct: {
          fields: [
            { name: 'byte', type: 'uint8' },
            { name: 'str', type: 'fstring8' } 
          ]
        }
      },
    };
    const biner = new Biner(config, Buffer.from([
      0x31, // byte: uint8
      0x02, // str.length uint8
      0x33, 0x30 // fstring8
    ]));
    expect(biner.parse()).toEqual({
      struct: {
        byte : 0x31,
        str  : '30'
      } 
    });
  });
  it ('Root struct', () => {
    var config: BinerConfig = {
      types: {
        '': {
          fields: [
            { name: 'byte', type: 'uint8' },
            { name: 'str', type: 'fstring8' } 
          ]
        },
      },
    };
    const biner = new Biner(config, Buffer.from([
      0x31, // byte: uint8
      0x02, // str.length uint8
      0x33, 0x30 // fstring8
    ]));
    expect(biner.parse()).toEqual({
      byte : 0x31,
      str  : '30'
    });
  });
});
