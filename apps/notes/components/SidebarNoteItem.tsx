import SidebarNoteItemContent from './SidebarNoteItemContent';
import SidebarNoteItemHeader from './SidebarNoteItemHeader';
import { type Note } from './SidebarNoteList';

interface SidebarNoteItemProps {
  id: string;
  note: Note;
  // header: React.ReactNode;
}

// 1. 服务端组件可以引用客服端组件，但是客户端组件不能引用服务端组件 ？ 因为客户端所有的代码都是在浏览器中执行的，而服务端组件是在服务端执行的，所以服务端组件无法在客户端执行
// 2. 服务端 -> 客户端传递值的时候 必须是可序列化的值
const SidebarNoteItem: React.FC<SidebarNoteItemProps> = ({ id, note }) => {
  return (
    <SidebarNoteItemContent
      id={id}
      expandedChildren={<p style={{ fontSize: 14, color: '#404040' }}>{note.content.slice(0, 20) || 'No content'}</p>}
      note={note}
    >
      <SidebarNoteItemHeader title={note.title} updateTime={note.updateTime} />
    </SidebarNoteItemContent>
  );
};

export default SidebarNoteItem;
