import {Inter} from "next/font/google";

import "../styles/globals.css";
import TopLoader from "./top-loader";
import {Providers} from "./providers";

import ReduxProviders from "@/redux/provider";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: ` Admin Panel | LibMaster`,
  description: `LibMaster is a library management system.`,
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="bg-[#f6f6f6] ">
      <body className={`${inter.className}`}>
        <ReduxProviders>
          <Providers>
            <TopLoader />
            {children}
          </Providers>
        </ReduxProviders>
      </body>
    </html>
  );
}
