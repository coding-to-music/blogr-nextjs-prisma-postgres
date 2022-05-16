// _app.tsx

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import LogRocket from "logrocket";
import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";

/* Initialize analytics */
const analytics = Analytics({
  app: "my-app-name",
  version: "1",
  plugins: [
    googleAnalytics({
      trackingId: "G-DKFCLMCZ4F",
    }),
  ],
});

/* Track a page view */
analytics.page();

/* Track a custom event */
analytics.track("userPurchase", {
  price: 20,
  item: "pink socks",
});

/* Identify a visitor */
analytics.identify("user-id-xyz", {
  firstName: "bill",
  lastName: "murray",
  email: "da-coolest@aol.com",
});

LogRocket.init("zas8ib/blogr-nextjs-prisma-postgres");

LogRocket.identify("THE_USER_ID_IN_YOUR_APP", {
  name: "James Morrison",
  email: "jamesmorrison@example.com",

  // Add your own custom user variables here, ie:
  subscriptionType: "pro",
});

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
