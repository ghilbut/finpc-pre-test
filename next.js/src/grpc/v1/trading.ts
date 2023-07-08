/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "trading";

export interface Stock {
  id: string;
  code: string;
  name: string;
  totalStockCount: number;
}

export interface StockListResp {
  stockList: Stock[];
}

function createBaseStock(): Stock {
  return { id: "", code: "", name: "", totalStockCount: 0 };
}

export const Stock = {
  encode(message: Stock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.code !== "") {
      writer.uint32(18).string(message.code);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.totalStockCount !== 0) {
      writer.uint32(32).uint32(message.totalStockCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Stock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.code = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.totalStockCount = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Stock {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      code: isSet(object.code) ? String(object.code) : "",
      name: isSet(object.name) ? String(object.name) : "",
      totalStockCount: isSet(object.totalStockCount) ? Number(object.totalStockCount) : 0,
    };
  },

  toJSON(message: Stock): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.totalStockCount !== 0) {
      obj.totalStockCount = Math.round(message.totalStockCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Stock>, I>>(base?: I): Stock {
    return Stock.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Stock>, I>>(object: I): Stock {
    const message = createBaseStock();
    message.id = object.id ?? "";
    message.code = object.code ?? "";
    message.name = object.name ?? "";
    message.totalStockCount = object.totalStockCount ?? 0;
    return message;
  },
};

function createBaseStockListResp(): StockListResp {
  return { stockList: [] };
}

export const StockListResp = {
  encode(message: StockListResp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.stockList) {
      Stock.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StockListResp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStockListResp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stockList.push(Stock.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StockListResp {
    return { stockList: Array.isArray(object?.stockList) ? object.stockList.map((e: any) => Stock.fromJSON(e)) : [] };
  },

  toJSON(message: StockListResp): unknown {
    const obj: any = {};
    if (message.stockList?.length) {
      obj.stockList = message.stockList.map((e) => Stock.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StockListResp>, I>>(base?: I): StockListResp {
    return StockListResp.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StockListResp>, I>>(object: I): StockListResp {
    const message = createBaseStockListResp();
    message.stockList = object.stockList?.map((e) => Stock.fromPartial(e)) || [];
    return message;
  },
};

export type TradingService = typeof TradingService;
export const TradingService = {
  getStockList: {
    path: "/trading.Trading/GetStockList",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: StockListResp) => Buffer.from(StockListResp.encode(value).finish()),
    responseDeserialize: (value: Buffer) => StockListResp.decode(value),
  },
} as const;

export interface TradingServer extends UntypedServiceImplementation {
  getStockList: handleUnaryCall<Empty, StockListResp>;
}

export interface TradingClient extends Client {
  getStockList(
    request: Empty,
    callback: (error: ServiceError | null, response: StockListResp) => void,
  ): ClientUnaryCall;
  getStockList(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: StockListResp) => void,
  ): ClientUnaryCall;
  getStockList(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: StockListResp) => void,
  ): ClientUnaryCall;
}

export const TradingClient = makeGenericClientConstructor(TradingService, "trading.Trading") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): TradingClient;
  service: typeof TradingService;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
