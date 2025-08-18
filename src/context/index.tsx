"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiAdapter, projectId } from '@/config';
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from "react";
import { bsc,bscTestnet } from '@reown/appkit/networks'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

const env = process.env.NEXT_PUBLIC_ENV;
const chain = env === 'production' ? bsc : bscTestnet;
const queryClient = new QueryClient();
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [chain],
  defaultNetwork: chain,
  includeWalletIds: [
    'walletconnect', // 添加 WalletConnect 钱包入口
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    '38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662',
    '20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66',
    '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4',
    'ef333840daf915aafdc4a004525502d6d49d77bd9c65e0642dbaefb3c2893bef',
    '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
    '15c8b91ade1a4e58f3ce4e7a0dd7f42b47db0c8df7e0d84f63eb39bcb96c4e0f',
  ],
  features: {
    email:false,
    socials:false,
    allWallets: false,
    analytics: false,
    swaps: false, // Optional - defaults to your Cloud configuration
    onramp: false,
  }
})

// function ContextProvider({ children }: { children: ReactNode }) {
//   return <QueryClientProvider client={queryClient}>
//     {children}
//   </QueryClientProvider>
// }

function ContextProvider({ children }: { children: ReactNode}) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider;
