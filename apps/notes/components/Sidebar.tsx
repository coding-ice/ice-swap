import { Flex } from 'antd';
import Link from 'next/link';

import SidebarNoteList from './SidebarNoteList';
import { getAllNotes } from '@/lib/redis';

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = async () => {
  const notes = await getAllNotes();

  return (
    <Flex vertical className="sidebar" gap={30} style={{ width: 280, borderRight: '1px solid #ccc', padding: 30 }}>
      <Link href={'/'} className="link--unstyled">
        <Flex align="center" gap={10} className="sidebar-header" style={{ fontSize: 20 }}>
          <img className="logo" src="/logo.svg" width="30" height="30" alt="" role="presentation" />
          <strong style={{ fontSize: 28 }}>React Notes</strong>
        </Flex>
      </Link>
      <section className="sidebar-menu" role="menubar">
        {/* SideSearchField */}
      </section>
      <nav>
        <SidebarNoteList notes={notes} />
      </nav>
    </Flex>
  );
};

export default SideBar;
