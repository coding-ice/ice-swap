import { Form, Input, InputNumber, Modal } from "antd";

export interface CreatePositionParams {
  token0: string;
  token1: string;
  index: number;
  amount0Desired: bigint;
  amount1Desired: bigint;
  recipient: string; // LP address
  deadline: bigint; // 交易截止时间
}

interface AddPoolModalProps {
  open: boolean;
  onCancel: () => void;
  onCreatePosition: (params: CreatePositionParams) => void;
}

const AddPoolModal: React.FC<AddPoolModalProps> = (props) => {
  const { open, onCancel, onCreatePosition } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add Position"
      open={open}
      onCancel={onCancel}
      okText="Create"
      onOk={() => {
        form.validateFields().then((values) => {
          onCreatePosition({
            ...values,
            amount0Desired: BigInt(values.amount0Desired),
            amount1Desired: BigInt(values.amount1Desired),
            deadline: BigInt(Date.now() + 100000),
          });
        });
      }}
    >
      <Form layout="vertical" form={form}>
        <Form.Item required label="Token 0" name="token0">
          <Input />
        </Form.Item>
        <Form.Item required label="Token 1" name="token1">
          <Input />
        </Form.Item>
        <Form.Item required label="Index" name="index">
          <InputNumber />
        </Form.Item>
        <Form.Item required label="Amount0 Desired" name="amount0Desired">
          <Input />
        </Form.Item>
        <Form.Item required label="Amount1 Desired" name="amount1Desired">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPoolModal;
