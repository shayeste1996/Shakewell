import { ReactNode } from "react";
import Head from "next/head";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import useTranslation from "next-translate/useTranslation";
import { instance } from "libs/axiosInstance";
import { ArticleCard } from "components/common/ArticleCard";
import { getRelativeTime } from "utils";
import MainLayout from "layout/main";
import { Article } from "types";

const getArticles = async () => {
  //getting data from cache
  return await instance
    .get(`public/articles/latest?per_page=10`)
    .then((res) => {
      return Promise.all(
        // loopm through article's id to get their data
        res.data.data.map(async (item: Article) => {
          const res = await instance.get(`public/articles/id/${item.id}`);
          return res.data.data;
        })
      );
    });
};
export default function Articles() {
  const { data } = useQuery<Article[]>(["articles"], getArticles);
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("articles")}</title>
      </Head>
      <h1 className="text-white font-bold text-3xl mb-10">
        {t("latest_article")}
      </h1>
      <div className="flex flex-wrap gap-y-5">
        {data?.map((item) => (
          <div className="flex-[0_0_320px] w-max-[320px]" key={item.id}>
            <ArticleCard
              title={item.title}
              date={getRelativeTime(
                +new Date(
                  +new Date(item.published_at ? item.published_at : "") -
                    60 * 60 * 1000
                )
              )}
              image="/images/article-img.png"
              id={item.id}
            />
          </div>
        ))}
      </div>
    </>
  );
}

Articles.requireAuth = true;
export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<Article[]>(["articles"], getArticles);
  //getting data on the server
  return { props: { dehydratedState: dehydrate(queryClient) } };
}
Articles.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
