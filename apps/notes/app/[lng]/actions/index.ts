'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { Note } from '@/components/SidebarNoteList';
import { addNote, deleteNoteById, updateNote } from '@/lib/redis';
import { sleep } from '@/utils';

type IMes = { message: string | null };

async function deleteNote(prevState: IMes, formData: FormData) {
  const noteId = formData.get('noteId') as string;

  await deleteNoteById(noteId);
  redirect('/');
}

async function saveNote(prevState: IMes, formData: FormData) {
  const noteId = formData.get('noteId') as string;
  const title = formData.get('title');
  const content = formData.get('body');

  const data = JSON.stringify({ title, content, updateTime: new Date() });
  if (!noteId) {
    await addNote(data);
    revalidatePath('/', 'layout');
  } else {
    await updateNote(noteId, data);
    revalidatePath('/', 'layout');
  }

  await sleep(2000);

  return {
    message: 'success',
  };
  // const data = JSON.stringify({ ...note, updateTime: new Date() });
  // if (!noteId) {
  //   const key = await addNote(data);
  //   revalidatePath('/', 'layout');
  //   redirect(`/note/${key}`); // 发送 post（303） 请求，跳转到新建的笔记页面 -> 此时页面的数据是最新的
  // } else {
  //   await updateNote(noteId, data);
  //   revalidatePath('/', 'layout');
  //   redirect(`/note/${noteId}`);
  // }
}

export { deleteNote, saveNote };
