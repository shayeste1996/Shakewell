import type { NextPage } from "next";
import Link from "next/link";
import { useAuth } from "context/Auth";

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <Link href="/articles">
          <a>articles page</a>
        </Link>
      ) : (
        <Link href="/signup">
          <a>sign up</a>
        </Link>
      )}
    </div>
  );
};

export default Home;
