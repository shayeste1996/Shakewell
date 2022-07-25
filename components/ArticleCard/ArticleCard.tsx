import { NextPage } from "next";
import Link from "next/link";

interface Props {
  title: string;
  image: string;
  date: string | undefined;
  id: string;
}
export const ArticleCard: NextPage<Props> = (props) => {
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
