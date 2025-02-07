"use client";

import { Button, Flex, Space, Table, Typography } from "antd";
import { createStyles } from "antd-style";
import { columns, data } from "./mockData";
import AddPositionModal, {
  type CreatePositionParams,
} from "./AddPositionModal";
import { useState } from "react";

const useStyle = createStyles(({ css }) => ({
  pool: css`
    width: 1400px;
    margin: 0 auto;
  `,
}));

const PoolListTable: React.FC = () => {
  const [openAddPositionModal, setOpenAddPositionModal] = useState(false);
  return (
    <>
      <Table
        title={() => (
          <Flex justify="space-between" align="center">
            <div>My Positions</div>
            <Space>
              <Button
                type="primary"
                onClick={() => setOpenAddPositionModal(true)}
              >
                Add
              </Button>
            </Space>
          </Flex>
        )}
        columns={columns}
        dataSource={data}
      />
      <AddPositionModal
        open={openAddPositionModal}
        onCancel={() => setOpenAddPositionModal(false)}
        onCreatePosition={(createPram: CreatePositionParams) => {
          console.log(createPram);
          setOpenAddPositionModal(false);
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
