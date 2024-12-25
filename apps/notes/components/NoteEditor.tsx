'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button, Flex, Input } from 'antd';
import { createStyles } from 'antd-style';
import { useRouter } from 'next/navigation';

import DeleteButton from './DeleteButton';
import NotePreview from './NotePreview';
import SaveButtion from './SaveButtion';
import { deleteNote, saveNote } from '@/app/[lng]/actions';

interface NoteEditorProps {
  initialTitle: string;
  initialBody: string;
  noteId?: string;
}

const useStyles = createStyles(({ css }) => ({
  wrapper: css``,
}));

const initialState = {
  message: null,
};

const NoteEditor: React.FC<NoteEditorProps> = ({ noteId, initialBody, initialTitle }) => {
  const isDraft = !noteId;
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const { styles } = useStyles();
  const router = useRouter();

  // @ts-expect-error
  const [saveState, saveFormAction] = useFormState(saveNote, initialState);
  // @ts-expect-error
  const [delState, delFormAction] = useFormState(deleteNote, initialState);
  const { pending } = useFormStatus();

  return (
    <Flex className={styles.wrapper} component="form" gap={30} justify="space-between">
      <Flex vertical style={{ width: 350 }} gap={30}>
        <h3>{saveState?.message}</h3>
        <input name="noteId" type="hidden" value={noteId} />
        <Input name="title" value={title} placeholder="title" onChange={e => setTitle(e.target.value)} />
        <Input.TextArea name="body" value={body} rows={30} onChange={e => setBody(e.target.value)} placeholder="body" />
      </Flex>
      <Flex vertical flex={1}>
        <Flex justify="end" gap={30}>
          <SaveButtion formAction={saveFormAction} />

          {!isDraft && <DeleteButton formAction={delFormAction} />}
        </Flex>
        <Flex className="preview" align="start" vertical gap={30}>
          <Button color="primary" variant="filled">
            PREVIEW
          </Button>
          <h3 style={{ fontSize: 30 }}>{title}</h3>
          {/* 因为被导入到客户端中：该组件就会被的依赖，就会被视为bound的一部分 */}
          <NotePreview>{body}</NotePreview>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NoteEditor;
