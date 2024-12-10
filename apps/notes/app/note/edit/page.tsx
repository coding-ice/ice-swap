import NoteEditor from '@/components/NoteEditor';

interface AddProps {}

const Add: React.FC<AddProps> = () => {
  return <NoteEditor initialTitle="Untitled" initialBody="" />;
};

export default Add;
