import { createPublicClient, http,createWalletClient,custom } from 'viem';
import { createConfig } from '@wagmi/core'
import { bsc,bscTestnet } from 'viem/chains'
 
const env = process.env.NEXT_PUBLIC_ENV;
const chain = env === 'production' ? bsc : bscTestnet;

export const readClient = createPublicClient({
  chain,
  transport: http()
})


export const addressFormat = (str: any) => {
    if (!str) return;
    const newStr = str.slice(0, 6) + '...' + str.slice(-4);
    return newStr;
};

export const walletClient = () => {
    return createWalletClient({
        chain,
        transport: custom(window.ethereum)
    })
}

export const configChain = (chain: any) => {
    return createConfig({
        chains: [chain],
        transports: {
          [chain.id]: http(),
        },
    })
}

export const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return accounts[0];
        } catch (error) {
            console.error('Error connecting to wallet:', error);
            throw error;
        }
    } else {
        throw new Error('connecting is not supported in this browser');
    }
}