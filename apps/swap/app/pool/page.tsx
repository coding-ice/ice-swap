"use client";

import { Button, Flex, Space, Table, Typography } from "antd";
import { createStyles } from "antd-style";
import Link from "next/link";
import { columns, data } from "./mockData";
import { useState } from "react";
import AddPoolModal, { type CreatePoolParams } from "./AddPoolModal";

const useStyle = createStyles(({ css }) => ({
  pool: css`
    width: 1400px;
    margin: 0 auto;
  `,
}));

const PoolListTable: React.FC = () => {
  const [openAddPoolModal, setOpenAddPoolModal] = useState(false);

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
              <Button type="primary" onClick={() => setOpenAddPoolModal(true)}>
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
        onCreatePool={(createPram: CreatePoolParams) => {
          console.log(createPram);
          setOpenAddPoolModal(false);
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
