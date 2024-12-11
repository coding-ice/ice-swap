'use client';

import { Children, PropsWithChildren } from 'react';
import { Space } from 'antd';
import { useSearchParams } from 'next/navigation';

interface SidebarNoteListFilterProps extends PropsWithChildren {
  // notes: any[];
}

const SidebarNoteListFilter: React.FC<SidebarNoteListFilterProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  // 方案一：通过 children 的 props 获取到 SidebarNoteItem 的 props，然后在这里进行过滤
  const filteredChildren = Children.map(children, child => {
    const title = (child as any)?.props?.note?.title;
    if (typeof child === 'object' && title.includes(search)) {
      return child;
    }
    return null;
  });
  const vaildChildrenLen = filteredChildren?.filter(Boolean).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      {Number(vaildChildrenLen) > 0 ? filteredChildren : <p>no data</p>}
    </div>
  );
};

export default SidebarNoteListFilter;
