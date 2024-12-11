'use client';

import { Children, PropsWithChildren } from 'react';
import { Space } from 'antd';
import { useSearchParams } from 'next/navigation';

import SidebarNoteItem from './SidebarNoteItem';
import { Note } from './SidebarNoteList';

interface SidebarNoteListFilterProps extends PropsWithChildren {
  notes: { noteId: string; note: Note; header: React.ReactNode }[];
}

const SidebarNoteListFilter: React.FC<SidebarNoteListFilterProps> = ({ notes }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  // 方案一：通过 children 的 props 获取到 SidebarNoteItem 的 props，然后在这里进行过滤
  // const filteredChildren = Children.map(children, child => {
  //   const title = (child as any)?.props?.note?.title;
  //   if (typeof child === 'object' && title.includes(search)) {
  //     return child;
  //   }
  //   return null;
  // });
  // const vaildChildrenLen = filteredChildren?.filter(Boolean).length;

  // return (
  //   <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
  //     {Number(vaildChildrenLen) > 0 ? filteredChildren : <p>no data</p>}
  //   </div>
  // );

  // 方案二： 通过传递的notes进行过滤

  return (
    <Space direction="vertical" size={10}>
      {notes.map(({ noteId, note, header }) => {
        if (!note.title.includes(search)) {
          return null;
        }
        return <SidebarNoteItem key={noteId} id={noteId} note={note} header={header} />;
      })}
    </Space>
  );

  // return null;
};

export default SidebarNoteListFilter;
