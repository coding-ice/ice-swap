'use client';

import { Button } from 'antd';
import { createStyles } from 'antd-style';
import Link from 'next/link';

interface CustomButtonProps {
  noteId?: string;
  children?: React.ReactNode;
}

const useStyle = createStyles(({ css }) => ({
  wrapper: css``,
}));

const CustomButton: React.FC<CustomButtonProps> = ({ noteId, children }) => {
  const { styles, cx } = useStyle();
  const isDraft = !noteId;

  return (
    <Link href={`/note/edit/${noteId || ''}`}>
      <Button type={isDraft ? 'primary' : 'default'}>{children}</Button>
    </Link>
  );
};

export default CustomButton;
