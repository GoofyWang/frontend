import type { Metadata } from "next";
import '@ant-design/v5-patch-for-react-19';
import Header from '@/components/Header';
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
            <Header/>
            {children}
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
