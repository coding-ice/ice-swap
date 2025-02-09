"use client";

import {
  MetaMask,
  OkxWallet,
  TokenPocket,
  WagmiWeb3ConfigProvider,
  WalletConnect,
  Hardhat,
  Mainnet,
} from "@ant-design/web3-wagmi";

import "./globals.css";
import Layout from "@/components/Layout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { hardhat } from "wagmi/chains";
import { http } from "viem";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <WagmiWeb3ConfigProvider
            eip6963={{ autoAddInjectedWallets: true }}
            ens
            chains={[Hardhat, Mainnet]}
            wallets={[
              MetaMask(),
              OkxWallet(),
              TokenPocket({
                group: "Popular",
              }),
              WalletConnect(),
            ]}
            walletConnect={{
              projectId: "c07c0051c2055890eade3556618e38a6",
            }}
            transports={{
              [hardhat.id]: http("http://localhost:8545"),
            }}
          >
            <Layout>{children}</Layout>
          </WagmiWeb3ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
