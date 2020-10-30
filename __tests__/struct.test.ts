import { Biner, BinerConfig, BinerType } from "../src";

describe("Struct tests", () => {
  it ('sandbox', () => {
    var config: BinerConfig = {
      types: {
        '': {
          fields: [
            { name: 'struct', type: "Struct"},
          ]
        },
        Struct: {
          fields: [
            { name: 'byte', type: 'uint8'},
            { name: 'str', type: 'fstring8'} 
          ]
        }
      },
    };
    const biner = new Biner(config, Buffer.from([0x31, 0x02, 0x33, 0x30]));
    expect(biner.parse()).toEqual({
      struct: {
        byte : 0x31,
        str  : '30'
      } 
    });
  });
});
