import { useQuery } from "@tanstack/react-query";
import {
  QueryClient,
  dehydrate,
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";
import { instance } from "fetchApi";

const getArticleInfo = async ({
  queryKey,
}: QueryFunctionContext<QueryKey, any>) => {
  //getting data from cache
  const [_, id] = queryKey;
  return await instance
    .get(`public/articles/id/${id}`)
    .then((res) => res.data.data);
};
interface Context {
  query: { id: string };
}
interface Props {
  info: { title: string; short_description: string };
}
interface Verification {
  id: string;
}
interface Data {
  title: string;
  short_description: string;
  author: string;
}

export default function Article({ id }: Verification) {
  const { data } = useQuery<Data>(["article", id], getArticleInfo);
  return (
    <main className="relative">
      <div className="bg-signup-bg  min-h-screen	bg-no-repeat bg-cover absolute inset-0 z-0" />
      <div className="mx-auto py-[100px] max-w-[1200px] text-white relative z-2">
        <h1 className="text-white font-bold text-3xl mb-10">{data?.title}</h1>
        <p className="text-xl">{data?.short_description}</p>
        <span className="mt-5 text-xs flex">by {data?.author}</span>
        <div className="flex flex-wrap gap-y-5"></div>
      </div>
    </main>
  );
}
Article.requireAuth = true;

export async function getServerSideProps(context: Context) {
  const id = context.query.id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<Data>(["article", id], getArticleInfo);
  //getting data on the server
  return { props: { dehydratedState: dehydrate(queryClient), id } };
}
