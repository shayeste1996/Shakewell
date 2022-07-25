import { ReactNode, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuth } from "context/Auth";

type Props = {
  children: ReactNode;
};
const AuthLayout: NextPage<Props> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // if user is logged in so authentication page must not be shown
  // and redirect to main page
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/articles");
    }
  }, [isAuthenticated]);
  return (
    <>
      {isAuthenticated ? null : (
        <main className="relative">
          <div className="bg-signup-bg  min-h-screen	bg-no-repeat bg-cover absolute inset-0" />
          <div className="max-w-[550px] mx-auto pt-5 relative z-10">
            {children}
          </div>
        </main>
      )}
    </>
  );
};

export default AuthLayout;
