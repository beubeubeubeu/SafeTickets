import Providers from "./providers";
import { Flex } from "@chakra-ui/react";
import Layout from './components/layout/Layout';

export const metadata = {
  title: "SafeTickets",
  description: "Your tickets as gold"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <body>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}