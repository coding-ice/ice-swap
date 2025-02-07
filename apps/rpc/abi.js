const poolManagerAbi = [
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "token0",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "token1",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      { name: "index", internalType: "uint32", type: "uint32", indexed: false },
      {
        name: "tickLower",
        internalType: "int24",
        type: "int24",
        indexed: false,
      },
      {
        name: "tickUpper",
        internalType: "int24",
        type: "int24",
        indexed: false,
      },
      { name: "fee", internalType: "uint24", type: "uint24", indexed: false },
      {
        name: "pool",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "PoolCreated",
  },
  {
    type: "function",
    inputs: [
      {
        name: "params",
        internalType: "struct IPoolManager.CreateAndInitializeParams",
        type: "tuple",
        components: [
          { name: "token0", internalType: "address", type: "address" },
          { name: "token1", internalType: "address", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "sqrtPriceX96", internalType: "uint160", type: "uint160" },
        ],
      },
    ],
    name: "createAndInitializePoolIfNecessary",
    outputs: [
      { name: "poolAddress", internalType: "address", type: "address" },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenA", internalType: "address", type: "address" },
      { name: "tokenB", internalType: "address", type: "address" },
      { name: "tickLower", internalType: "int24", type: "int24" },
      { name: "tickUpper", internalType: "int24", type: "int24" },
      { name: "fee", internalType: "uint24", type: "uint24" },
    ],
    name: "createPool",
    outputs: [{ name: "pool", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "getAllPools",
    outputs: [
      {
        name: "poolsInfo",
        internalType: "struct IPoolManager.PoolInfo[]",
        type: "tuple[]",
        components: [
          { name: "pool", internalType: "address", type: "address" },
          { name: "token0", internalType: "address", type: "address" },
          { name: "token1", internalType: "address", type: "address" },
          { name: "index", internalType: "uint32", type: "uint32" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "feeProtocol", internalType: "uint8", type: "uint8" },
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "tick", internalType: "int24", type: "int24" },
          { name: "sqrtPriceX96", internalType: "uint160", type: "uint160" },
          { name: "liquidity", internalType: "uint128", type: "uint128" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getPairs",
    outputs: [
      {
        name: "",
        internalType: "struct IPoolManager.Pair[]",
        type: "tuple[]",
        components: [
          { name: "token0", internalType: "address", type: "address" },
          { name: "token1", internalType: "address", type: "address" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenA", internalType: "address", type: "address" },
      { name: "tokenB", internalType: "address", type: "address" },
      { name: "index", internalType: "uint32", type: "uint32" },
    ],
    name: "getPool",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "pairs",
    outputs: [
      { name: "token0", internalType: "address", type: "address" },
      { name: "token1", internalType: "address", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "parameters",
    outputs: [
      { name: "factory", internalType: "address", type: "address" },
      { name: "tokenA", internalType: "address", type: "address" },
      { name: "tokenB", internalType: "address", type: "address" },
      { name: "tickLower", internalType: "int24", type: "int24" },
      { name: "tickUpper", internalType: "int24", type: "int24" },
      { name: "fee", internalType: "uint24", type: "uint24" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
    name: "pools",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
];

module.exports = { poolManagerAbi };
