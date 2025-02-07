import { TableProps } from "antd";

export const columns: TableProps["columns"] = [
  {
    title: "Token 0",
    dataIndex: "token0",
    key: "token0",
  },
  {
    title: "Token 1",
    dataIndex: "token1",
    key: "token1",
  },
  {
    title: "Index",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Fee",
    dataIndex: "fee",
    key: "fee",
  },
  {
    title: "Fee Protocol",
    dataIndex: "feeProtocol",
    key: "feeProtocol",
  },
  {
    title: "Tick Lower",
    dataIndex: "tickLower",
    key: "tickLower",
  },
  {
    title: "Tick Upper",
    dataIndex: "tickUpper",
    key: "tickUpper",
  },
  {
    title: "Tick",
    dataIndex: "tick",
    key: "tick",
  },
  {
    title: "Price",
    dataIndex: "sqrtPriceX96",
    key: "sqrtPriceX96",
    render: (value: bigint) => {
      return value.toString();
    },
  },
];

export const data = [
  {
    token0: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    token1: "0xEcd0D12E21805803f70de03B72B1C162dB0898d9",
    index: 0,
    fee: 3000,
    feeProtocol: 0,
    tickLower: -100000,
    tickUpper: 100000,
    tick: 1000,
    sqrtPriceX96: BigInt("12345"),
  },
];
