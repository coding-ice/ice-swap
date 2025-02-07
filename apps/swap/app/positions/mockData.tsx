import { Space, TableProps } from "antd";

export const columns: TableProps["columns"] = [
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
    ellipsis: true,
  },
  {
    title: "Token 0",
    dataIndex: "token0",
    key: "token0",
    ellipsis: true,
  },
  {
    title: "Token 1",
    dataIndex: "token1",
    key: "token1",
    ellipsis: true,
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
    title: "Liquidity",
    dataIndex: "liquidity",
    key: "liquidity",
    render: (value: bigint) => {
      return value.toString();
    },
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
    title: "Tokens Owed 0",
    dataIndex: "tokensOwed0",
    key: "tokensOwed0",
    render: (value: bigint) => {
      return value.toString();
    },
  },
  {
    title: "Tokens Owed 1",
    dataIndex: "tokensOwed1",
    key: "tokensOwed1",
    render: (value: bigint) => {
      return value.toString();
    },
  },
  {
    title: "Fee Growth Inside 0",
    dataIndex: "feeGrowthInside0LastX128",
    key: "feeGrowthInside0LastX128",
    render: (value: bigint) => {
      return value.toString();
    },
  },
  {
    title: "Fee Growth Inside 1",
    dataIndex: "feeGrowthInside1LastX128",
    key: "feeGrowthInside1LastX128",
    render: (value: bigint) => {
      return value.toString();
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <Space direction="vertical">
        <a>Remove</a>
        <a>Collect</a>
      </Space>
    ),
  },
];

export const data = [
  {
    owner: "0x1234567890abcdef1234567890abcdef12345678",
    token0: "0x1234567890abcdef1234567890abcdef12345678",
    token1: "0x1234567890abcdef1234567890abcdef12345678",
    index: 0,
    fee: 3000,
    liquidity: BigInt(1234560000000),
    tickLower: -123456,
    tickUpper: 123456,
    tokensOwed0: BigInt(123456),
    tokensOwed1: BigInt(654321),
    feeGrowthInside0LastX128: BigInt(123456),
    feeGrowthInside1LastX128: BigInt(654321),
  },
];
