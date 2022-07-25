import { NextPage } from "next";
import Link from "next/link";
import { Article } from "types";

export const ArticleCard: NextPage<Article> = (props) => {
  const { title, image, date, id } = props;

  return (
    <Link href={`/articles/${id}`}>
      <a>
        <div className="mb-3 rounded-md">
          <img src={image} alt="image" />
        </div>
        <h3 className="mb-4 text-white text-base font-bold">{title}</h3>
        <p className="text-xs text-sub">{date}</p>
      </a>
    </Link>
  );
};
