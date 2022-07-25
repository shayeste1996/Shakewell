import { ReactNode } from "react";
import Head from "next/head";
import { useMutation } from "@tanstack/react-query";
import useTranslation from "next-translate/useTranslation";
import { Button } from "components/Button";
import AuthLayout from "layout/auth";
import { useAuth } from "context/Auth";
import { instance } from "fetchApi";

export default function Verify() {
  const { t } = useTranslation("common");
  const { user } = useAuth();

  // make a verification email request
  const { isLoading, mutate } = useMutation(async () => {
    return await instance.post(`auth/resendVerification`, {
      email: user.email,
    });
  });

  return (
    <>
      <Head>
        <title>{t("Verification")}</title>
      </Head>
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
    </>
  );
}

Verify.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
