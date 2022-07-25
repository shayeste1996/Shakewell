import { useAuth } from "context/Auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    //auth is initialized and there is no user
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated]);

console.log('gaus')
  // if auth initialized with a valid user show protected page
  /* otherwise don't return anything, will do a redirect from useEffect */
  return <>{isAuthenticated ? children : null}</>;
}
