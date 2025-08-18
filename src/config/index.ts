import { cookieStorage, http,createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { bsc,bscTestnet } from '@reown/appkit/networks'

// Get projectId from https://dashboard.reown.com
export const projectId = '8ddf3b2ffcfe4059daaf212d8157449b'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

const env = process.env.NEXT_PUBLIC_ENV;
const chain = env === 'production' ? bsc : bscTestnet;

export const networks = [chain]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks,
})

export const config = wagmiAdapter.wagmiConfig