'use client';

import { useEffect, useTransition } from 'react';
import { Input } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

interface SideSearchFieldProps {}

const SideSearchField: React.FC<SideSearchFieldProps> = () => {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return <Input onChange={handleOnChange} defaultValue={params.get('search') || ''} />;
};

export default SideSearchField;
