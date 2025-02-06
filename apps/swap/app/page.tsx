"use client";

import { TokenSelect, type Token } from "@ant-design/web3";
import { USDT, USDC, ETH } from "@ant-design/web3-assets/tokens";
import { Button, Card, Flex, Input, Space } from "antd";
import { createStyles } from "antd-style";
import { SwapOutlined } from "@ant-design/icons";
import { useState } from "react";

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

const Swap: React.FC = () => {
  const { styles } = useStyle();
  const [tokenA, setTokenA] = useState<Token>(ETH);
  const [tokenB, setTokenB] = useState<Token>(USDT);

  const [amountA, setAmountA] = useState(0);
  const [amountB, setAmountB] = useState(0);

  const [optionsA, setOptionsA] = useState<Token[]>([ETH, USDT, USDC]);
  const [optionsB, setOptionsB] = useState<Token[]>([USDT, ETH, USDC]);

  const handleSwitch = () => {
    setTokenA(tokenB);
    setTokenB(tokenA);
    setAmountA(amountB);
    setAmountB(amountA);
  };

  const handleMax = () => {
    setAmountA(1000000000000000000);
  };

  return (
    <Card className={styles.wrapper} classNames={{ body: styles.body }}>
      <Card>
        <Input
          variant="borderless"
          type="number"
          addonAfter={<TokenSelect value={tokenA} options={optionsA} />}
          value={amountA}
          onChange={(e) => setAmountA(parseFloat(e.target.value))}
        />
        <Space>
          <span className="price">$ 0.0</span>
          <span className="banance">Balance: 0</span>
          <Button type="link" size="small" onClick={handleMax}>
            Max
          </Button>
        </Space>
      </Card>
      <Flex justify="center">
        <Button shape="circle" icon={<SwapOutlined />} onClick={handleSwitch} />
      </Flex>
      <Card>
        <Input
          variant="borderless"
          type="number"
          addonAfter={<TokenSelect value={tokenB} options={optionsB} />}
          value={amountB}
        />
        <Space>
          <span className="price">$ 0.0</span>
          <span className="banance">Balance: 0</span>
        </Space>
      </Card>
      <Button type="primary" block>
        Swap
      </Button>
    </Card>
  );
};

export default Swap;
