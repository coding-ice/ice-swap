const { ethers, Contract } = require("ethers");
const { poolManagerAbi } = require("./abi.js");

const p = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");

const c = new Contract(
  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  poolManagerAbi,
  p
);

async function main() {
  console.log(await c.getAllPools());
}

main();
