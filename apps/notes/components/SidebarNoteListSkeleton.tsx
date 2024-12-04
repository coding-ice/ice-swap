'use client';

import { Skeleton, Space } from 'antd';

interface SidebarNoteListSkeletonProps {}

const SidebarNoteListSkeleton: React.FC<SidebarNoteListSkeletonProps> = () => {
  return (
    <Space size={15} direction="vertical">
      <Skeleton.Node active style={{ width: 219, height: 62 }} />
      <Skeleton.Node active style={{ width: 219, height: 62 }} />
      <Skeleton.Node active style={{ width: 219, height: 62 }} />
    </Space>
  );
};

export default SidebarNoteListSkeleton;
