"use client";

import { TokenSelect, type Token } from "@ant-design/web3";
import { USDT, USDC, ETH } from "@ant-design/web3-assets/tokens";
import { Button, Card, Flex, Input, message, Space } from "antd";
import { createStyles } from "antd-style";
import { SwapOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  swapRouterAbi,
  useReadIPoolManagerGetAllPools,
  useReadPoolManagerGetPairs,
  useWriteErc20Approve,
  useWriteSwapRouterExactInput,
  useWriteSwapRouterExactOutput,
} from "@/utils/contracts";
import {
  computeSqrtPriceLimitX96,
  getContractAddress,
  getTokenInfo,
  parseAmountToBigInt,
  parseBigIntToAmount,
} from "@/utils/common";
import Balance from "@/components/Balance";
import { useAccount, usePublicClient } from "wagmi";
import useTokenAddress from "@/hooks/useTokenAddress";

const useStyle = createStyles(({ css }) => ({
  wrapper: css`
    width: 600px;
  `,
  body: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
}));

const unique = (arr: `0x${string}`[]) => {
  return Array.from(new Set(arr));
};

const Swap: React.FC = () => {
  const { styles } = useStyle();

  const [loading, setLoading] = useState(false);
  // 用户可以选择的代币
  const [tokens, setTokens] = useState<Token[]>([]);
  // 用户选择的两个代币
  const [tokenA, setTokenA] = useState<Token>();
  const [tokenB, setTokenB] = useState<Token>();
  // 两个代币的地址
  const tokenAddressA = useTokenAddress(tokenA);
  const tokenAddressB = useTokenAddress(tokenB);
  // 按照地址大小排序
  const [token0, token1] =
    tokenAddressA && tokenAddressB && tokenAddressA < tokenAddressB
      ? [tokenAddressA, tokenAddressB]
      : [tokenAddressB, tokenAddressA];
  // 是否是 token0 来交换 token1
  const zeroForOne = token0 === tokenAddressA;
  // 是否是指定输入（否则就是指定输出）
  const [isExactInput, setIsExactInput] = useState(true);
  // 两个代币的数量
  const [amountA, setAmountA] = useState(0);
  const [amountB, setAmountB] = useState(0);
  const { account } = useAccount();

  // 获取所有的交易对
  const { data: pairs = [] } = useReadPoolManagerGetPairs({
    address: getContractAddress("PoolManager"),
  });

  useEffect(() => {
    const options: Token[] = unique(
      pairs.map((pair) => [pair.token0, pair.token1]).flat()
    ).map(getTokenInfo);
    setTokens(options);
    setTokenA(options[0]);
    setTokenB(options[1]);
  }, [pairs]);

  // 获取所有的交易池
  const { data: pools = [] } = useReadIPoolManagerGetAllPools({
    address: getContractAddress("PoolManager"),
  });

  // 计算交易池的交易顺序
  const swapPools = pools.filter((pool) => {
    return (
      pool.token0 === token0 && pool.token1 === token1 && pool.liquidity > 0
    );
  });
  const swapIndexPath: number[] = swapPools
    .sort((a, b) => {
      // 简单处理，按照价格排序，再按照手续费排序，优先在价格低的池子中交易（按照 tick 判断），如果价格一样，就在手续费低的池子里面交易
      if (a.tick !== b.tick) {
        if (zeroForOne) {
          // token0 交换 token1 时，tick 越大意味着 token0 价格越高，所以要把 tick 大的放前面
          return b.tick > a.tick ? 1 : -1;
        }
        return a.tick > b.tick ? 1 : -1;
      }
      return a.fee - b.fee;
    })
    .map((pool) => pool.index);

  // 计算本次交易的价格限制
  const sqrtPriceLimitX96 = computeSqrtPriceLimitX96(swapPools, zeroForOne);

  const publicClient = usePublicClient();

  const updateAmountBWithAmountA = async (value: number) => {
    if (
      !publicClient ||
      !tokenAddressA ||
      !tokenAddressB ||
      isNaN(value) ||
      value === 0
    ) {
      return;
    }
    if (tokenAddressA === tokenAddressB) {
      message.error("Please select different tokens");
      return;
    }
    try {
      const newAmountB = await publicClient.simulateContract({
        address: getContractAddress("SwapRouter"),
        abi: swapRouterAbi,
        functionName: "quoteExactInput",
        args: [
          {
            tokenIn: tokenAddressA,
            tokenOut: tokenAddressB,
            indexPath: swapIndexPath,
            amountIn: parseAmountToBigInt(value, tokenA),
            sqrtPriceLimitX96,
          },
        ],
      });
      debugger;
      setAmountB(parseBigIntToAmount(newAmountB.result, tokenB));
      setIsExactInput(true);
    } catch (e: any) {
      message.error(e.message);
    }
  };

  const updateAmountAWithAmountB = async (value: number) => {
    if (!publicClient || !tokenAddressA || !tokenAddressB || isNaN(value)) {
      return;
    }
    try {
      const newAmountA = await publicClient.simulateContract({
        address: getContractAddress("SwapRouter"),
        abi: swapRouterAbi,
        functionName: "quoteExactOutput",
        args: [
          {
            tokenIn: tokenAddressA,
            tokenOut: tokenAddressB,
            indexPath: swapIndexPath,
            amountOut: parseAmountToBigInt(value, tokenB),
            sqrtPriceLimitX96,
          },
        ],
      });
      setAmountA(parseBigIntToAmount(newAmountA.result, tokenA));
      setIsExactInput(false);
    } catch (e: any) {
      message.error(e.message);
    }
  };

  const handleAmountAChange = (e: any) => {
    const value = parseFloat(e.target.value);
    setAmountA(value);
    setIsExactInput(true);
  };

  const handleAmountBChange = (e: any) => {
    const value = parseFloat(e.target.value);
    setAmountB(value);
    setIsExactInput(false);
  };

  const handleSwitch = () => {
    setTokenA(tokenB);
    setTokenB(tokenA);
    setAmountA(amountB);
    setAmountB(amountA);
  };

  useEffect(() => {
    // 当用户输入发生变化时，重新请求报价接口计算价格
    if (isExactInput) {
      updateAmountBWithAmountA(amountA);
    } else {
      updateAmountAWithAmountB(amountB);
    }
  }, [isExactInput, tokenAddressA, tokenAddressB, amountA, amountB]);

  const { writeContractAsync: writeExactInput } =
    useWriteSwapRouterExactInput();
  const { writeContractAsync: writeExactOutput } =
    useWriteSwapRouterExactOutput();
  const { writeContractAsync: writeApprove } = useWriteErc20Approve();

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <Card className={styles.wrapper} classNames={{ body: styles.body }}>
        <Card>
          <Input
            variant="borderless"
            type="number"
            addonAfter={
              <TokenSelect
                value={tokenA}
                onChange={setTokenA}
                options={tokens}
              />
            }
            value={amountA}
            onChange={(e) => setAmountA(parseFloat(e.target.value))}
          />
          <Space>
            <span className="price">$ 0.0</span>
            <span className="banance">
              Balance:
              <Balance token={tokenA} />
            </span>
          </Space>
        </Card>
        <Flex justify="center">
          <Button
            shape="circle"
            icon={<SwapOutlined />}
            onClick={handleSwitch}
          />
        </Flex>
        <Card>
          <Input
            variant="borderless"
            type="number"
            addonAfter={
              <TokenSelect
                value={tokenB}
                onChange={setTokenB}
                options={tokens}
              />
            }
            value={amountB}
          />
          <Space>
            <span className="price">$ 0.0</span>
          </Space>
        </Card>
        <Button
          type="primary"
          size="large"
          block
          disabled={!tokenAddressA || !tokenAddressB || !amountA || !amountB}
          loading={loading}
          onClick={async () => {
            setLoading(true);
            try {
              if (isExactInput) {
                const swapParams = {
                  tokenIn: tokenAddressA!,
                  tokenOut: tokenAddressB!,
                  amountIn: parseAmountToBigInt(amountA, tokenA),
                  amountOutMinimum: parseAmountToBigInt(amountB, tokenB),
                  recipient: account?.address as `0x${string}`,
                  deadline: BigInt(Math.floor(Date.now() / 1000) + 1000),
                  sqrtPriceLimitX96,
                  indexPath: swapIndexPath,
                };
                console.log("swapParams", swapParams);
                await writeApprove({
                  address: tokenAddressA!,
                  args: [getContractAddress("SwapRouter"), swapParams.amountIn],
                });
                await writeExactInput({
                  address: getContractAddress("SwapRouter"),
                  args: [swapParams],
                });
              } else {
                const swapParams = {
                  tokenIn: tokenAddressA!,
                  tokenOut: tokenAddressB!,
                  amountOut: parseAmountToBigInt(amountB, tokenB),
                  amountInMaximum: parseAmountToBigInt(
                    Math.ceil(amountA),
                    tokenA
                  ),
                  recipient: account?.address as `0x${string}`,
                  deadline: BigInt(Math.floor(Date.now() / 1000) + 1000),
                  sqrtPriceLimitX96,
                  indexPath: swapIndexPath,
                };
                console.log("swapParams", swapParams);
                await writeApprove({
                  address: tokenAddressA!,
                  args: [
                    getContractAddress("SwapRouter"),
                    swapParams.amountInMaximum,
                  ],
                });
                await writeExactOutput({
                  address: getContractAddress("SwapRouter"),
                  args: [swapParams],
                });
              }
              message.success("Swap success");
              setAmountA(NaN);
              setAmountB(NaN);
            } catch (e: any) {
              message.error(e.message);
            } finally {
              setLoading(false);
            }
          }}
        >
          Swap
        </Button>
      </Card>
    </div>
  );
};

export default Swap;
