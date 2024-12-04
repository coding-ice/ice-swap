'use server';

import { redirect } from 'next/navigation';

import type { Note } from '@/components/SidebarNoteList';
import { addNote, deleteNoteById, updateNote } from '@/lib/redis';

async function deleteNote(noteId: string) {
  await deleteNoteById(noteId);
  redirect('/');
}

async function saveNote(note: Omit<Note, 'updateTime'>, noteId?: string) {
  const data = JSON.stringify({ ...note, updateTime: new Date() });

  if (!noteId) {
    const key = await addNote(data);
    redirect(`/note/${key}`);
  } else {
    await updateNote(noteId, data);
    redirect(`/note/${noteId}`);
  }
}

async function red() {
  redirect('/');
}

export { deleteNote, saveNote, red };
