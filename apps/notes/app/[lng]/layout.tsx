import { PropsWithChildren } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Poppins } from 'next/font/google';

import './globals.css';

import { Flex } from 'antd';

import StyleRegistry from './StyleRegistry';
import SideBar from '@/components/Sidebar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

interface RootLayoutProps extends PropsWithChildren {
  params: {
    lng: string;
  };
}

export default function RootLayout({ children, params: { lng } }: RootLayoutProps) {
  return (
    <html lang={lng} className={poppins.className}>
      <body>
        <StyleRegistry>
          <AntdRegistry>
            <div className="container h-full">
              <Flex className="main" style={{ height: '100%' }}>
                <SideBar />
                <section className="note-viewer" style={{ flex: 1, background: 'rgb(246, 247, 250)', padding: 30 }}>
                  {children}
                </section>
              </Flex>
            </div>
          </AntdRegistry>
        </StyleRegistry>
      </body>
    </html>
  );
}
