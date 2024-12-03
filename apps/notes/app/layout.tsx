import { PropsWithChildren } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Poppins } from 'next/font/google';

import './globals.css';

import StyleRegistry from './StyleRegistry';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <StyleRegistry>
          <AntdRegistry>{children}</AntdRegistry>
        </StyleRegistry>
      </body>
    </html>
  );
}
