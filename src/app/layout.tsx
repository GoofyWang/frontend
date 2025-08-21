import type { Metadata } from "next";
import '@ant-design/v5-patch-for-react-19';
import ConditionalHeader from '@/components/ConditionalHeader';
import './globals.css';
import ContextProvider from '@/context'

export const metadata: Metadata = {
  title: "stake",
  description: "stake dapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <div className="">
            <ConditionalHeader/>
            {children}
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
