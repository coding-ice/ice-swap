'use client';

import { ChangeEvent, ChangeEventHandler } from 'react';
import { useRouter } from 'next/navigation';

interface SoderbarImportantProps {}

const SoderbarImportant: React.FC<SoderbarImportantProps> = () => {
  const router = useRouter();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn('files list is empty');
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        console.error('something went wrong');
        return;
      }

      const data = await res.json();
      router.push(`/note/${data.uid}`);
      router.refresh();
    } catch (e) {
      console.error(e);
    }

    e.target.type = 'text';
    e.target.type = 'file';
  };

  return (
    <form method="post" encType="multipart/form-data">
      <div style={{ textAlign: 'center' }}>
        <label htmlFor="file" style={{ cursor: 'pointer' }}>
          Import .md File
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".md"
          multiple
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default SoderbarImportant;
