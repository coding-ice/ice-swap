'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button, Flex, Input } from 'antd';
import { createStyles } from 'antd-style';
import { useRouter } from 'next/navigation';

import NotePreview from './NotePreview';
import { deleteNote, saveNote } from '@/app/actions';

interface NoteEditorProps {
  initialTitle: string;
  initialBody: string;
  noteId?: string;
}

const useStyles = createStyles(({ css }) => ({
  wrapper: css``,
}));

const NoteEditor: React.FC<NoteEditorProps> = ({ noteId, initialBody, initialTitle }) => {
  const isDraft = !noteId;
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const { styles } = useStyles();
  const { pending } = useFormStatus();
  const router = useRouter();

  return (
    <Flex className={styles.wrapper} gap={30} justify="space-between">
      <Flex vertical style={{ width: 350 }} gap={30}>
        <Input value={title} placeholder="title" onChange={e => setTitle(e.target.value)} />
        <Input.TextArea value={body} rows={30} onChange={e => setBody(e.target.value)} placeholder="body" />
      </Flex>
      <Flex vertical flex={1}>
        <form>
          <Flex justify="end" gap={30}>
            <Button
              type="primary"
              htmlType="submit"
              loading={pending}
              disabled={pending}
              formAction={() => {
                saveNote({ title, content: body }, noteId);
              }}
            >
              Done
            </Button>
            {!isDraft && (
              <Button
                variant="solid"
                color="danger"
                htmlType="submit"
                disabled={pending}
                loading={pending}
                formAction={async () => {
                  await deleteNote(noteId);
                }}
              >
                Delete
              </Button>
            )}
          </Flex>
        </form>
        <Flex className="preview" align="start" vertical gap={30}>
          <Button color="primary" variant="filled">
            PREVIEW
          </Button>
          <h3 style={{ fontSize: 30 }}>{title}</h3>
          <NotePreview>{body}</NotePreview>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NoteEditor;
