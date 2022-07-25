import { ReactNode, useEffect } from "react";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";

import { useMutation } from "@tanstack/react-query";
import { instance } from "fetchApi";
import useTranslation from "next-translate/useTranslation";
import { Button } from "components/Button";
import AuthLayout from "layout/auth";
import { useAuth } from "context/Auth";
import { useRouter } from "next/router";

interface IUser {
  email: string;
  password: string;
  device_name?: string;
}
interface IError {
  response: {
    data: {
      errors: IUser;
    };
  };
}
type Articles = {
  id: string;
  title: string;
  published_at: Date;
};

const getArticles = async () => {
  //getting data from cache
  return await instance
    .get(`auth/resendVerification`)
    .then((res) => res.data.data);
};
export default function Verify() {
  const { t } = useTranslation("common");
  const { setIsAuthenticated, user } = useAuth();
  const { isLoading, mutate } = useMutation(
    async () => {
      return await instance.post(`auth/resendVerification`, {
        email: user.email,
      });
    },
    {
      onSuccess: (res) => {
        console.log(res.data.data);
      },
    }
  );
  const router = useRouter();

  // useEffect(() => {
  //   if (user) {
  //     router.push("/articles");
  //   }
  // }, [user]);
  return (
    <div className="flex flex-col mx-auto py-10 text-white text-center">
      <h1 className=" text-3xl font-bold my-10">{t("verfiy_email")}</h1>
      <div className="text-[18px]">{t("email_desc1")}</div>
      <p className="font-bold mt-3 text-[19px]">{user.email}</p>
      <div className="text-[18px] mt-8">{t("email_desc2")}</div>
      <div className="text-[18px] mt-8">{t("email_desc3")}</div>
      <div className="mt-10 mx-auto">
        <Button
          loading={isLoading}
          onClick={mutate}
          text={t("resend_email")}
          type="primary"
        />
      </div>
    </div>
  );
}

Verify.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
