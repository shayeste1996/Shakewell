import ReactNode, { useEffect } from "react";
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
import AuthLayout from "layout/auth";
interface Context {
  query: { id: string; hash: string };
}

interface Verification {
  id: string;
  hash: string;
}

const getVerification = async (id, hash) => {
  //getting data from cache
  return await instance
    .get(`auth/verify/email/${id}/${hash}`)
    .then((res) => res.data.data);
};
export default function Verification() {
  const router = useRouter();
  const { query } = router;
  const { setIsAuthenticated, user } = useAuth();
  const { data, isSuccess, isError, isLoading } = useQuery(
    ["product", query.id, query.hash],
    () => getVerification(query.id, query.hash)
  );

  useEffect(() => {
    if (isSuccess) {
      setIsAuthenticated(true);
      router.push("/articles");
    } else {
      router.push("/signin");
    }
  }, [isSuccess]);
  if (isError && !isLoading) {
    router.push("/signup");
  }
  return null;
}

// export async function getServerSideProps(context: Context) {
//   const queryClient = new QueryClient();
//   const id = context.query.id;
//   const hash = context.query.hash;
//   // await queryClient.prefetchQuery<Verification>(
//   //   ["Verification", id, hash],
//   //   getVerification
//   // );
//   const posts = await getVerification(id, hash)
//   return { props: { posts, id, hash } }
//   //getting data on the server
//   // return { props: { dehydratedState: dehydrate(queryClient), id, hash } };
// }
Verification.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
