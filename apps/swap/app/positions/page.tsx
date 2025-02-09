"use client";

import { Button, Flex, Space, Table, TableProps, Typography } from "antd";
import { createStyles } from "antd-style";
import AddPositionModal, {
  type CreatePositionParams,
} from "./AddPositionModal";
import { useState } from "react";
import {
  useReadPositionManagerGetAllPositions,
  useWriteErc20Approve,
  useWritePositionManagerBurn,
  useWritePositionManagerCollect,
  useWritePositionManagerMint,
} from "@/utils/contracts";
import { getContractAddress } from "@/utils/common";
import { useAccount } from "wagmi";

const useStyle = createStyles(({ css }) => ({
  pool: css`
    width: 1400px;
    margin: 0 auto;
  `,
}));

const PoolListTable: React.FC = () => {
  const [openAddPositionModal, setOpenAddPositionModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: positions = [], refetch } =
    useReadPositionManagerGetAllPositions({
      address: getContractAddress("PositionManager"),
    });
  const { writeContractAsync: writeContractMint } =
    useWritePositionManagerMint();

  const { writeContractAsync: writePosiManagerBurn } =
    useWritePositionManagerBurn();

  const { writeContractAsync: writePosiManagerCollect } =
    useWritePositionManagerCollect();

  const { writeContractAsync } = useWriteErc20Approve();
  const { address: account } = useAccount();

  const columns: TableProps["columns"] = [
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
      render: (_, { owner, liquidity, id, tokensOwed0, tokensOwed1 }) => {
        if (account === owner) {
          return (
            <Space direction="vertical">
              {liquidity > 0 && (
                <a
                  onClick={async () => {
                    await writePosiManagerBurn({
                      address: getContractAddress(
                        "PositionManager"
                      ) as `0x${string}`,
                      args: [id],
                    });
                    refetch();
                  }}
                >
                  Remove
                </a>
              )}
              {(tokensOwed0 > 0 || tokensOwed1 > 0) && (
                <a
                  onClick={async () => {
                    await writePosiManagerCollect({
                      address: getContractAddress("PositionManager"),
                      args: [id, account!],
                    });
                    refetch();
                  }}
                >
                  Collect
                </a>
              )}
            </Space>
          );
        }

        return <>-</>;
      },
    },
  ];

  return (
    <>
      <Table
        title={() => (
          <Flex justify="space-between" align="center">
            <Space>
              <Button
                type="primary"
                onClick={() => setOpenAddPositionModal(true)}
                loading={loading}
              >
                Add
              </Button>
            </Space>
          </Flex>
        )}
        columns={columns}
        dataSource={positions}
      />
      <AddPositionModal
        open={openAddPositionModal}
        onCancel={() => setOpenAddPositionModal(false)}
        onCreatePosition={async (createPram: CreatePositionParams) => {
          setLoading(true);
          setOpenAddPositionModal(false);

          try {
            // 1. 批准 0 token 给 PositionManager
            await writeContractAsync({
              address: createPram.token0,
              args: [
                getContractAddress("PositionManager"),
                createPram.amount0Desired,
              ],
            });

            // 2. 批准 1 token 给 PositionManager
            await writeContractAsync({
              address: createPram.token1,
              args: [
                getContractAddress("PositionManager"),
                createPram.amount1Desired,
              ],
            });

            // 3. 创建 Position
            await writeContractMint({
              address: getContractAddress("PositionManager"),
              args: [
                {
                  token0: createPram.token0,
                  token1: createPram.token1,
                  index: createPram.index,
                  amount0Desired: createPram.amount0Desired,
                  amount1Desired: createPram.amount1Desired,
                  recipient: account!,
                  deadline: createPram.deadline,
                },
              ],
            });
            refetch();
          } catch (e) {
            console.error(e);
          } finally {
            setLoading(false);
          }
        }}
      />
    </>
  );
};

const Positions: React.FC = () => {
  const { styles } = useStyle();

  return (
    <div className={styles.pool}>
      <Typography.Title level={2}>Positions</Typography.Title>
      <PoolListTable />
    </div>
  );
};

export default Positions;
