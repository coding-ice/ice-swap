"use client";

import { Button, Flex, message, Space, Table, Typography } from "antd";
import { createStyles } from "antd-style";
import Link from "next/link";
import { columns } from "./mockData";
import { useState } from "react";
import AddPoolModal, { type CreatePoolParams } from "./AddPoolModal";
import {
  useReadPoolManagerGetAllPools,
  useWritePoolManagerCreateAndInitializePoolIfNecessary,
} from "@/utils/contracts";
import { getContractAddress } from "@/utils/common";

const useStyle = createStyles(({ css }) => ({
  pool: css`
    width: 1400px;
    margin: 0 auto;
  `,
}));

const PoolListTable: React.FC = () => {
  const [openAddPoolModal, setOpenAddPoolModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data = [], refetch } = useReadPoolManagerGetAllPools({
    address: getContractAddress("PoolManager"),
  });

  console.log(data, "data");
  const { writeContractAsync } =
    useWritePoolManagerCreateAndInitializePoolIfNecessary();

  return (
    <>
      <Table
        title={() => (
          <Flex justify="space-between" align="center">
            <div>Pool List</div>
            <Space>
              <Link href="/positions">
                <Button>My Positions</Button>
              </Link>
              <Button
                type="primary"
                onClick={() => setOpenAddPoolModal(true)}
                loading={loading}
              >
                Add Pool
              </Button>
            </Space>
          </Flex>
        )}
        columns={columns}
        dataSource={data}
      />
      <AddPoolModal
        open={openAddPoolModal}
        onCancel={() => setOpenAddPoolModal(false)}
        onCreatePool={async (createParams: CreatePoolParams) => {
          setLoading(true);
          setOpenAddPoolModal(false);

          try {
            await writeContractAsync({
              address: getContractAddress("PoolManager"),
              args: [
                {
                  token0: createParams.token0,
                  token1: createParams.token1,
                  fee: createParams.fee,
                  tickLower: createParams.tickLower,
                  tickUpper: createParams.tickUpper,
                  sqrtPriceX96: createParams.sqrtPriceX96,
                },
              ],
            });
            message.success("Create Pool Success If Necessary");
            refetch();
          } catch (error: any) {
            message.error(error.message);
          } finally {
            setLoading(false);
          }
        }}
      />
    </>
  );
};

const Pool: React.FC = () => {
  const { styles } = useStyle();

  return (
    <div className={styles.pool}>
      <Typography.Title level={2}>Pool</Typography.Title>
      <PoolListTable />
    </div>
  );
};

export default Pool;
