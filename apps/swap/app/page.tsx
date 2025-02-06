"use client";

import { TokenSelect } from "@ant-design/web3";
import { Button, Card, Flex, Input, Space } from "antd";
import { createStyles } from "antd-style";
import { SwapOutlined } from "@ant-design/icons";

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

  return (
    <Card className={styles.wrapper} classNames={{ body: styles.body }}>
      <Card>
        <Input
          variant="borderless"
          type="number"
          addonAfter={<TokenSelect />}
        />
        <Space>
          <span className="price">$ 0.0</span>
          <span className="banance">Balance: 0</span>
          <Button type="link" size="small">
            Max
          </Button>
        </Space>
      </Card>
      <Flex justify="center">
        <Button shape="circle" icon={<SwapOutlined />} />
      </Flex>
      <Card>
        <Input
          variant="borderless"
          type="number"
          addonAfter={<TokenSelect />}
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
