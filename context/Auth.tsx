import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { instance } from "fetchApi";
import Cookies from "js-cookie";
import { Loading } from "@components/Loading";

export const AuthContext = React.createContext<
  | {
      user: null;
      isAuthenticated: boolean;
      setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
      setUser: Dispatch<SetStateAction<null>>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export function useAuth() {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return auth;
}

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { isLoading } = useQuery(["token-check"], async () => {
    return await instance.get(`auth/token/check`).then(() => {
      setIsAuthenticated(true);
    });
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  const value = {
    user,
    isAuthenticated,
    setIsAuthenticated,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading || loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
