import { Space } from 'antd';
import dayjs from 'dayjs';

interface SidebarNoteItemHeaderProps {
  title: string;
  updateTime: string;
}

const SidebarNoteItemHeader: React.FC<SidebarNoteItemHeaderProps> = ({ title, updateTime }) => {
  return (
    <Space size={10} direction="vertical" className="w-full note">
      <h3 className="note-title" style={{ fontSize: 18, color: '#414141' }}>
        {title}
      </h3>
      <div className="note-update-time" style={{ fontSize: 14, color: '#414141' }}>
        {dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss')}
      </div>
    </Space>
  );
};

export default SidebarNoteItemHeader;
