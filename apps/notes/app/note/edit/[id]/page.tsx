import NoteEditor from '@/components/NoteEditor';
import { Note } from '@/components/SidebarNoteList';
import { getNoteById } from '@/lib/redis';

interface EditProps {
  params: {
    id: string;
  };
}

const Edit: React.FC<EditProps> = async ({ params }) => {
  const noteId = params.id;

  const note = await getNoteById(noteId);

  if (!note) {
    return 'no note!';
  }

  const parsedNote = JSON.parse(note) as Note;

  return <NoteEditor noteId={noteId} initialTitle={parsedNote.title} initialBody={parsedNote.content} />;
};

export default Edit;
