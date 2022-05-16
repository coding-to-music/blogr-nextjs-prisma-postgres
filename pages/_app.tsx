// _app.tsx

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import LogRocket from "logrocket";

LogRocket.init("zas8ib/blogr-nextjs-prisma-postgres");

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({ apiKey: "o6o11R6yNNN96RpBRfZ2" });

// Get the visitor identifier when you need it.
fpPromise
  .then((fp) => fp.get())
  .then((result) => console.log(result.visitorId));

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
