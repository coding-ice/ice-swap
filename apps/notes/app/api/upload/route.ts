import { mkdir, stat, writeFile } from 'fs/promises';
import path from 'path';
import dayjs from 'dayjs';
import mime from 'mime';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { addNote } from '@/lib/redis';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dayjs().format('YYYY-MM-DD')}`;
  const uploadDir = path.join(process.cwd(), 'public', relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(e);
      return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
  }

  try {
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const filename = file.name.replace(/\.[^/.]+$/, '');
    const uniqueFilename = `${filename}-${uniqueSuffix}.md`;

    await writeFile(path.join(uploadDir, uniqueFilename), buffer);

    const res = await addNote(
      JSON.stringify({
        title: filename,
        content: buffer.toString('utf-8'),
      }),
    );

    // 清除缓存
    revalidatePath('/', 'layout');

    return NextResponse.json({ fileUrl: `${relativeUploadDir}/${uniqueFilename}`, uid: res });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
