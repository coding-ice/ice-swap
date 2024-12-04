import { Space } from 'antd';

import SidebarNoteItem from './SidebarNoteItem';
import { getAllNotes } from '@/lib/redis';
import { sleep } from '@/utils';

export interface Note {
  title: string;
  content: string;
  updateTime: string;
}

const SidebarNoteList: React.FC = async () => {
  await sleep(1000);
  const notes = await getAllNotes();

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
