import { Biner, BinerConfig, BinerType } from "../src";

describe("Biner tests", () => {
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
