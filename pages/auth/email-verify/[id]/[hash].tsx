import { useEffect } from "react";
import {
  useQuery,
  QueryClient,
  dehydrate,
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";
import { instance } from "fetchApi";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useAuth } from "context/Auth";

interface Context {
  query: { id: string; hash: string };
}

interface Verification {
  id: string;
  hash: string;
}

const getVerification = async ({
  queryKey,
}: QueryFunctionContext<QueryKey, any>) => {
  //getting data from cache
  const [_, id, hash] = queryKey;
  return await instance
    .get(`auth/verify/email/${id}/${hash}`)
    .then((res) => res.data.data);
};
export default function Verification({ id, hash }: Verification) {
  const { isLoading, isError } = useQuery<Verification[]>(
    ["Verification", id, hash],
    getVerification
  );

  const router = useRouter();

  if (isError && !isLoading) {
    router.push("/signup");
  }
  return null;
}
export async function getServerSideProps(context: Context) {
  const queryClient = new QueryClient();
  const id = context.query.id;
  const hash = context.query.hash;
  await queryClient.prefetchQuery<Verification>(
    ["Verification", id, hash],
    getVerification
  );
  //getting data on the server
  return { props: { dehydratedState: dehydrate(queryClient), id, hash } };
}
