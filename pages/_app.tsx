// _app.tsx

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import LogRocket from "logrocket";
LogRocket.init("zas8ib/blogr-nextjs-prisma-postgres");

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
