import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactNode, ReactElement, useState } from "react";
import { NextComponentType, NextPageContext, NextPage } from "next";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import Head from "next/head";
import { AuthProvider } from "context/Auth";
import { AuthGuard } from "components/AuthGaurd";

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
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
        <meta
          name="description"
          content="Next.js Client side sign in example"
          key="description"
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
