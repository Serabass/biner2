
export interface Types {
  [key: string]: {
    size?: number;
    read(buffer: Buffer, offset: number): {
      result: any;
      offset: number;
    };
  }
}

export var TYPES: Types = {
  uint8: {
    size: 1,
    read(buffer: Buffer, offset: number) {
      return {
        result : buffer.readUInt8(offset),
        offset : 1,
      };
    }
  },
  uint16: {
    size: 2,
    read(buffer: Buffer, offset: number) {
      return {
        result : buffer.readUInt16BE(offset),
        offset : 1,
      };
    }
  },
  uint32: {
    size: 4,
    read(buffer: Buffer, offset: number) {
      return {
        result : buffer.readUInt32BE(offset),
        offset : 4,
      };
    }
  },
  fstring8: {
    read(buffer: Buffer, offset: number) { // TODO Use Buffer.alloc instead
      let length = buffer.readUInt8();
      let result = '';

      console.log(length);
      for (let i = 1; i <= length; i++) {
        let byte = buffer.readUInt8(offset + i);
        result += String.fromCharCode(byte);
      }
 
      return {
        result,
        offset: offset + length + 1
      }
    }
  },
  nstring: {
    read(buffer: Buffer, offset: number) { // TODO Use Buffer.alloc instead
      let result = '';
      let i = 0;
      while (true) {
        let byte = buffer.readUInt8(offset + i);

        if (byte === 0x00) {
          break;
        }

        result += String.fromCharCode(byte);
        i++;
      }

      return {
        result,
        offset: i
      }
    }
  },
  float: {
    read(buffer: Buffer, offset: number) {
      return {
        result : buffer.readFloatBE(offset),
        offset : 4
      };
    }
  }
}
