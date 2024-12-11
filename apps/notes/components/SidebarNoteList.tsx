import { Space } from 'antd';

import SidebarNoteItem from './SidebarNoteItem';
import SidebarNoteItemHeader from './SidebarNoteItemHeader';
import SidebarNoteListFilter from './SidebarNoteListFilter';
import { getAllNotes } from '@/lib/redis';

export interface Note {
  title: string;
  content: string;
  updateTime: string;
}

const SidebarNoteList: React.FC = async () => {
  const notes = await getAllNotes();

  const arr = Object.entries(notes);

  // 1. 方案一，通过 children，然后在客户端组件中过滤（提前渲染，避免吧依赖注入到客户端中）
  // return (
  //   <SidebarNoteListFilter>
  //     {arr.map(([idx, note]) => {
  //       const parsedNote = JSON.parse(note);
  //       return <SidebarNoteItem key={idx} id={idx} note={parsedNote} />;
  //     })}
  //   </SidebarNoteListFilter>
  // );

  // 2. 直接服务端渲染完成，在传递给客户端进行过滤
  return (
    <SidebarNoteListFilter
      notes={arr.map(([key, note]) => {
        const n = JSON.parse(note) as Note;

        return {
          noteId: key,
          note: n,
          header: <SidebarNoteItemHeader title={n.title} updateTime={n.updateTime} />,
        };
      })}
    />
  );
};

export default SidebarNoteList;
