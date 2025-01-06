import { Suspense } from 'react';
import { Flex, Input } from 'antd';
import Link from 'next/link';

import CustomButton from './CustomButton';
import SidebarNoteList from './SidebarNoteList';
import SidebarNoteListSkeleton from './SidebarNoteListSkeleton';
import SideSearchField from './SideSearchField';
import SoderbarImportant from './SoderbarImportant';

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  return (
    <Flex vertical className="sidebar" gap={30} style={{ width: 280, borderRight: '1px solid #ccc', padding: 30 }}>
      <Link href={'/'} className="link--unstyled">
        <Flex align="center" gap={10} className="sidebar-header" style={{ fontSize: 20 }}>
          <img className="logo" src="/logo.svg" width="30" height="30" alt="" role="presentation" />
          <strong style={{ fontSize: 28 }}>React Notes</strong>
        </Flex>
      </Link>
      <Flex gap={20} className="sidebar-menu" role="menubar">
        <SideSearchField />
        <CustomButton>New</CustomButton>
      </Flex>
      <nav>
        <Suspense fallback={<SidebarNoteListSkeleton />}>
          <SidebarNoteList />
        </Suspense>
      </nav>
      <SoderbarImportant />
    </Flex>
  );
};

export default SideBar;
