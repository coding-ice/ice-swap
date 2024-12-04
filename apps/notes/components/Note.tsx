import { Flex } from 'antd';
import dayjs from 'dayjs';

import CustomButton from './CustomButton';
import NotePreview from './NotePreview';
import { Note as NoteType } from './SidebarNoteList';

interface NoteProps {
  id: string;
}

const Note: React.FC<NoteProps & NoteType> = ({ id, title, content, updateTime }) => {
  return (
    <Flex vertical gap={30}>
      <Flex justify="space-between" align="center">
        <span>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</span>
        <CustomButton noteId={id}>Edit</CustomButton>
      </Flex>
      <h2 style={{ marginBottom: 10, fontSize: 32 }}>{title}</h2>
      <NotePreview>{content}</NotePreview>
    </Flex>
  );
};

export default Note;
