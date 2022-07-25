import { ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { instance } from "libs/axiosInstance";
import { useRouter } from "next/router";
import { useAuth } from "context/Auth";
import AuthLayout from "layout/auth";

interface Verification {
  id: string;
  hash: string;
}
type query = string | string[] | undefined;

const getVerification = async (id: query, hash: query) => {
  //getting data from cache
  return await instance
    .get(`auth/verify/email/${id}/${hash}`)
    .then((res) => res.data.data);
};
export default function Verification() {
  const router = useRouter();
  const { query } = router;
  const { setIsAuthenticated } = useAuth();

  // make a request by id and hash to verify email
  const { isSuccess, isError, isLoading } = useQuery(
    ["verification", query.id, query.hash],
    () => getVerification(query.id, query.hash)
  );

  useEffect(() => {
    // if the request is successfull go to article page
    if (isSuccess) {
      setIsAuthenticated(true);
      router.push("/articles");
    } else {
      //otherwise go to sign in page
      router.push("/signin");
    }
  }, [isSuccess]);

  return null;
}

Verification.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
