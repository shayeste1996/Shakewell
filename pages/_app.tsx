import { ReactNode, useState } from "react";
import { NextComponentType, NextPageContext, NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { AuthProvider } from "context/Auth";
import { AuthGuard } from "layout/protected";
import "../styles/globals.css";

type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};
type CustomAppProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, {}> &
    Partial<NextPageWithAuth> & {
      requireAuth?: boolean;
      getLayout?: (page: any) => ReactNode;
    };
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
  const getLayout = Component.getLayout || ((page) => page);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: twentyFourHoursInMs,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
          key="viewport"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Shakewell" key="description" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400;1,500&display=swap"
          as="font"
          type="font/woff"
          crossOrigin=""
        />
      </Head>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthProvider>
            {/* if requireAuth property is present - protect the page */}
            {Component.requireAuth ? (
              <AuthGuard>{getLayout(<Component {...pageProps} />)}</AuthGuard>
            ) : (
              getLayout(<Component {...pageProps} />)
            )}
          </AuthProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
