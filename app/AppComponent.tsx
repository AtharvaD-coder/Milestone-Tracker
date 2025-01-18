'use client'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider, darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


const config = getDefaultConfig({
    appName: 'project',
    projectId: process.env.NEXT_PUBLIC_PROJID_KEY!,
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  });

const queryClient = new QueryClient();

export const AppComponent = ({ children }: { children: React.ReactNode })=>{
    return(
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()}  >
              <div className=''>
                <main>
              <div className="flex float-end mt-3 mr-3">
        
      </div>
                  {children}
                  </main>
                </div>
            </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
  