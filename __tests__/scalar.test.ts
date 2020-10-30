import { Biner, BinerConfig, BinerScalarType } from "../src";

describe('Scalar values', () => {
  it("uint8", () => {
    var config: BinerConfig = {
      types: {
        '': {
          typename: 'uint8'
        } as BinerScalarType,
      },
    };
    const biner = new Biner(config, Buffer.from([0x25]));
    expect(biner.parse()).toEqual(0x25);
  });
  
  it("uint16", () => {
    var config: BinerConfig = {
      types: {
        '': {
          typename: 'uint16'
        } as BinerScalarType,
      },
    };
    const biner = new Biner(config, Buffer.from([0x25, 0x24]));
    expect(biner.parse()).toEqual(0x2524);
  });

  it("uint32", () => {
    var config: BinerConfig = {
      types: {
        '': {
          typename: 'uint32'
        } as BinerScalarType,
      },
    };
    const biner = new Biner(config, Buffer.from([0xDE, 0xAD, 0xBE, 0xEF]));
    expect(biner.parse()).toEqual(0xDEADBEEF);
  });

  it("float", () => {
    var config: BinerConfig = {
      types: {
        '': {
          typename: 'float'
        } as BinerScalarType,
      },
    };
    let buffer=  Buffer.from([0x00, 0x00, 0x00, 0x00]);
    buffer.writeFloatBE(0.1);
    const biner = new Biner(config, buffer);
    expect(Math.floor(biner.parse() * 100) / 100).toEqual(0.1);
  });
});
