// _app.tsx

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import LogRocket from "logrocket";

LogRocket.init("zas8ib/blogr-nextjs-prisma-postgres");

LogRocket.identify("THE_USER_ID_IN_YOUR_APP", {
  name: "James Morrison",
  email: "jamesmorrison@example.com",

  // Add your own custom user variables here, ie:
  subscriptionType: "pro",
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
