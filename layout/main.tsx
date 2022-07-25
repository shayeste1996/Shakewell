import { ReactNode } from "react";
import { NextPage } from "next";
import { useAuth } from "context/Auth";

type Props = {
  children: ReactNode;
};
const MainLayout: NextPage<Props> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <div className="relative">
          <header className="mx-auto py-10 max-w-[1400px] relative z-10">
            <button
              className="text-white font-extrabold  text-xl"
              onClick={logout}
            >
              logout
            </button>
          </header>
          <main>
            <div className="bg-signup-bg  min-h-screen	bg-no-repeat bg-cover absolute inset-0" />
            <div className="mx-auto pt-10 pb-[100px] max-w-[1400px] relative z-10">
              {children}
            </div>
          </main>
        </div>
      ) : null}
    </>
  );
};

export default MainLayout;
