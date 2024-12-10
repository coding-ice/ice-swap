'use server';

import { revalidatePath } from 'next/cache';
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
    revalidatePath('/', 'layout');
    redirect(`/note/${key}`); // 发送 post（303） 请求，跳转到新建的笔记页面 -> 此时页面的数据是最新的
  } else {
    await updateNote(noteId, data);
    revalidatePath('/', 'layout');
    redirect(`/note/${noteId}`);
  }
}

export { deleteNote, saveNote };
