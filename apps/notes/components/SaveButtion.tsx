import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from 'antd';

interface SaveButtionProps extends ButtonProps {}

const SaveButtion: React.FC<SaveButtionProps> = props => {
  const { pending } = useFormStatus();

  return (
    <Button type="primary" htmlType="submit" loading={pending} disabled={pending} {...props}>
      {pending ? 'Saving...' : 'Done'}
    </Button>
  );
};

export default SaveButtion;
