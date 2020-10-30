import { Biner, BinerConfig, BinerType } from "../src";

describe("Biner tests", () => {
  let RGB: BinerType = {
    fields: [
      { name: 'r', type: "uint8"},
      { name: 'g', type: "uint8"},
      { name: 'b', type: "uint8"},
    ]
  };
  it("RGB", () => {
    var config: BinerConfig = {
      types: {
        '': {
          fields: [
            { name: 'color', type: "RGB"},
          ]
        },
        RGB,
      },
    };
    const biner = new Biner(config, Buffer.from([0xFF, 0x00, 0x00]));
    expect(biner.parse()).toEqual({
      color: {
        r : 0xFF,
        g : 0x00,
        b : 0x00,
      }
    });
  });

  it("fstring8", () => {
    var config: BinerConfig = {
      types: {
        '': {
          fields: [
            { name: 'string', type: "fstring8"},
          ]
        },
      },
    };
    const biner = new Biner(config, Buffer.from([0x03, 0x33, 0x33, 0x33]));
    expect(biner.parse()).toEqual({
      string: "333"
    });
  });

  it("fstring8 + RGB", () => {
    var config: BinerConfig = {
      types: {
        '': {
          fields: [
            { name: 'string', type: "fstring8"},
            { name: 'color', type: "RGB"},
          ]
        },
        RGB
      },
    };
    const biner = new Biner(config, Buffer.from([
      0x03, 0x33, 0x33, 0x33, // fstring
      0xFF, 0x00, 0x00 // RGB
    ]));
    expect(biner.parse()).toEqual({
      string : "333",
      color  : {
        r : 0xFF,
        g : 0x00,
        b : 0x00,
      }
    });
  });

  it ('nstring', () => {
    var config: BinerConfig = {
      types: {
        '': {
          fields: [
            { name: 'string', type: "nstring"},
          ]
        },
      },
    };
    const biner = new Biner(config, Buffer.from([0x31, 0x32, 0x33, 0x00]));
    expect(biner.parse()).toEqual({
      string: "123"
    });
  });
});
