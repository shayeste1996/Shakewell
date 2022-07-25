import { NextPage } from "next";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import useTranslation from "next-translate/useTranslation";
import { instance } from "fetchApi";
import { ArticleCard } from "@components/ArticleCard";
import { getRelativeTime } from "utils";

interface Props {
  articles: [];
}
type Articles = {
  id: string;
  title: string;
  published_at: Date;
};

const getArticles = async () => {
  //getting data from cache
  return await instance
    .get(`public/articles/latest?per_page=10`)
    .then((res) => {
      return Promise.all(
        res.data.data.map((item: Articles) => {
          return instance
            .get(`public/articles/id/${item.id}`)
            .then((res) => res.data.data);
        })
      );
    });
};
export default function Articles() {
  const { data } = useQuery<Articles[]>(["articles"], getArticles);
  const { t } = useTranslation("common");

  return (
    <div className="bg-signup-bg 	bg-no-repeat bg-cover">
      <div className="mx-auto py-[100px] max-w-[1400px]">
        <h1 className="text-white font-bold text-3xl mb-10">
          {t("latest_article")}
        </h1>
        <div className="flex flex-wrap gap-y-5">
          {data?.map((item) => (
            <div className="flex-[0_0_320px] w-max-[320px]" key={item.id}>
              <ArticleCard
                title={item.title}
                date={getRelativeTime(
                  +new Date(+new Date(item.published_at) - 60 * 60 * 1000)
                )}
                image="/images/article-img.png"
                id={item.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Articles.requireAuth = true;
export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<Articles[]>(["articles"], getArticles);
  //getting data on the server
  return { props: { dehydratedState: dehydrate(queryClient) } };
}
