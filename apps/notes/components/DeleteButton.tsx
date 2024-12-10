import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from 'antd';

interface DeleteButtonProps extends ButtonProps {}

const DeleteButton: React.FC<DeleteButtonProps> = props => {
  const { pending } = useFormStatus();

  return (
    <Button variant="solid" color="danger" htmlType="submit" loading={pending} {...props}>
      Delete
    </Button>
  );
};

export default DeleteButton;
