import { Skeleton } from 'antd';

interface loadingProps {}

const loading: React.FC<loadingProps> = () => {
  return <Skeleton active />;
};

export default loading;
