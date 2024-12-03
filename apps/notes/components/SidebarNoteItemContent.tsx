'use client';

import { PropsWithChildren, useState } from 'react';
import { Flex } from 'antd';
import { createStyles } from 'antd-style';

interface SidebarNoteItemContentProps extends PropsWithChildren {
  id: string;
  expandedChildren: React.ReactNode;
}

const useStyle = createStyles(({ css }) => {
  return {
    wrapper: css`
      position: relative;
      padding: 10px;
      background: #f1f2f4;
      border-radius: 8px;
      .sidebar-note-toggle-expand {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        padding: 0;
        .arrow {
          cursor: pointer;
          width: 12px;
          height: 12px;
          transition: all 0.3s;
          &.rotate {
            transform: rotate(180deg);
          }
        }
      }
    `,
  };
});

const SidebarNoteItemContent: React.FC<SidebarNoteItemContentProps> = ({ children, expandedChildren }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { styles, cx } = useStyle();

  return (
    <Flex gap={10} vertical className={styles.wrapper}>
      {children}
      <Flex
        component="button"
        className="sidebar-note-toggle-expand"
        justify="center"
        align="center"
        onClick={e => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        <img className={cx('arrow', { rotate: isExpanded })} src="/arrow.svg" />
      </Flex>
      {isExpanded && expandedChildren}
    </Flex>
  );
};

export default SidebarNoteItemContent;
