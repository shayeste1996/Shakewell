import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { instance } from "fetchApi";
import { IUser } from "types";
import { Loading } from "components/Loading";
import Cookies from "js-cookie";

export const AuthContext = React.createContext<
  | {
      user: IUser;
      isAuthenticated: boolean;
      setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
      setUser: Dispatch<SetStateAction<IUser>>;
      logout: () => void;
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
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    username: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { isLoading } = useQuery(["token-check"], async () => {
    return await instance.get(`auth/token/check`).then(() => {
      setIsAuthenticated(true);
    });
  }); 
   const router = useRouter();

  const logout = () => {
    Cookies.remove("token-test");
    setIsAuthenticated(false);
    router.push('/signin')
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => setLoading(true);
    const handleComplete = (url: string) => setLoading(false);

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
    logout,
  };
  console.log(isLoading, "isLoading", loading, "loading",isAuthenticated,"isAuthenticated");
  return (
    <AuthContext.Provider value={value}>
      {isLoading || loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
