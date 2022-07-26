import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { instance } from "requests/request";
import { IUser } from "types";
import { Loading } from "components/ui/Loading";
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
  const router = useRouter();
  const [user, setUser] = useState<IUser>({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // check if user token is valid
  const { isLoading } = useQuery(["token-check"], async () => {
    return await instance.get(`auth/token/check`).then(() => {
      setIsAuthenticated(true);
    });
  });

  const logout = () => {
    Cookies.remove("token-test");
    setIsAuthenticated(false);
    router.push("/signin");
  };

  const [loading, setLoading] = useState(false);

  // show loading on route change
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

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
  return (
    <AuthContext.Provider value={value}>
      {isLoading || loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
