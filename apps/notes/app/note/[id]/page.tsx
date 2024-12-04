import Note from '@/components/Note';
import { getNoteById } from '@/lib/redis';
import { sleep } from '@/utils';

interface NotePageProps {
  params: { id: string };
}

const NotePage: React.FC<NotePageProps> = async ({ params }) => {
  await sleep(1000);

  const noteId = params.id;
  const note = await getNoteById(noteId);

  if (!note) {
    return 'no note';
  }

  return <Note id={noteId} {...JSON.parse(note)} />;
};

export default NotePage;
