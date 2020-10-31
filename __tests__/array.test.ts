import { Biner, BinerConfig, BinerType } from "../src";
 
describe("Arrays", () => {
  let RGB: BinerType = {
    fields: [
      { name: "r", type: "uint8" }, 
      { name: "g", type: "uint8" },
      { name: "b", type: "uint8" },
    ],
  };
  it("RGB", () => {
    var config: BinerConfig = {
      types: {
        "": {
          fields: [
            {
              name  : "colors",
              array : {
                of     : "RGB",
                length : 3,
              },
            },
          ],
        },
        RGB,
      },
    };
    const biner = new Biner(
      config,
      Buffer.from([
        0xff, 0x00, 0x00, // first 
        0xff, 0xff, 0x00, // second
        0xff, 0xff, 0xff, // third
      ])
    );
    expect(biner.parse()).toEqual({
      colors: [
        {
          r : 0xff,
          g : 0x00,
          b : 0x00,
        },
        {
          r : 0xff,
          g : 0xff,
          b : 0x00,
        },
        {
          r : 0xff, 
          g : 0xff,
          b : 0xff,
        },
      ],
    });
  });
  it("uint8 array", () => {
    var config: BinerConfig = {
      types: {
        "": {
          fields: [
            {
              name  : "numbers",
              array : {
                of     : "uint8",
                length : 3,
              },
            },
          ],
        },
        RGB,
      },
    };
    const biner = new Biner(
      config,
      Buffer.from([
        0x01, 0x02, 0x03,
      ])
    );
    expect(biner.parse()).toEqual({
      numbers: [
        0x01, 0x02, 0x03,
      ],
    });
  });
  it("uint16 array", () => {
    var config: BinerConfig = {
      types: {
        "": {
          fields: [
            {
              name  : "numbers",
              array : {
                of     : "uint16",
                length : 2,
              },
            },
          ],
        },
        RGB,
      },
    };
    const biner = new Biner(
      config,
      Buffer.from([
        0x01, 0x01, 0x02, 0x02,
      ])
    );
    expect(biner.parse()).toEqual({
      numbers: [
        0x0101, 0x0202
      ],
    });
  });
});
