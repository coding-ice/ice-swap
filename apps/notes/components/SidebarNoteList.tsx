// 'use client';

import { Space } from 'antd';
import dayjs from 'dayjs';

import SidebarNoteItem from './SidebarNoteItem';

export interface Note {
  title: string;
  content: string;
  updateTime: string;
}

interface SidebarNoteListProps {
  notes: Record<string, string>;
}

const SidebarNoteList: React.FC<SidebarNoteListProps> = ({ notes }) => {
  const arr = Object.entries(notes);
  if (arr.length === 0) {
    return <div>No notes</div>;
  }

  return (
    <Space size={15} direction="vertical" className="notes w-full">
      {arr.map(([id, note]) => {
        const parseNote = JSON.parse(note) as Note;
        return <SidebarNoteItem id={id} key={id} {...parseNote} />;
      })}
    </Space>
  );
};

export default SidebarNoteList;
