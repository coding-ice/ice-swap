// 'use client';

import { Space } from 'antd';
import dayjs from 'dayjs';

interface Note {
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
    <Space size={15} direction="vertical" className="notes">
      {arr.map(([id, note]) => {
        const { title, content, updateTime } = JSON.parse(note) as Note;
        return (
          <Space size={5} direction="vertical" key={id} className="note" style={{ cursor: 'pointer' }}>
            <div className="note-title" style={{ fontSize: 20, color: '#414141' }}>
              {title}
            </div>
            <div className="note-update-time" style={{ fontSize: 14, color: '#414141' }}>
              {dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          </Space>
        );
      })}
    </Space>
  );
};

export default SidebarNoteList;
