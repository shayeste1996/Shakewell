import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  QueryClient,
  dehydrate,
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";
import Head from "next/head";
import MainLayout from "layout/main";
import { instance } from "requests/request";
import { Article, IContext } from "types";

const getArticleInfo = async ({
  queryKey,
}: QueryFunctionContext<QueryKey, any>) => {
  //getting data from cache
  const [_, id] = queryKey;
  return await instance
    .get(`public/articles/id/${id}`)
    .then((res) => res.data.data);
};

interface Verification {
  id: string;
}

export default function SingleArticle({ id }: Verification) {
  const { data } = useQuery<Article>(["article", id], getArticleInfo);
  return (
    <>
      <Head>
        <title>{data?.title}</title>
      </Head>
      <div className="text-white">
        <h1 className=" font-bold text-3xl mb-10">{data?.title}</h1>
        <p className="text-xl">{data?.short_description}</p>
        <span className="mt-5 text-xs flex">by {data?.author}</span>
        <div className="flex flex-wrap gap-y-5"></div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: IContext) {
  const id = context.query.id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<Article>(["article", id], getArticleInfo);
  //getting data on the server
  return { props: { dehydratedState: dehydrate(queryClient), id } };
}
SingleArticle.requireAuth = true;

SingleArticle.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
