import { http, createConfig } from '@wagmi/core'
import {bsc,bscTestnet} from 'viem/chains';

const env = process.env.NEXT_PUBLIC_ENV;
const chain = env === 'production' ? bsc : bscTestnet;

const configChain = () => {
  const configMain = createConfig({
    chains: [bsc],
    transports: {
      [bsc.id]: http(),
    },
  });
  const configTest = createConfig({
    chains: [bscTestnet],
    transports: {
      [bscTestnet.id]: http(),
    },
  });
  const config = env === 'production' ? configMain : configTest;
  return config;
}
export const config = configChain();