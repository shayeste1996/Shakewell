import { ReactNode, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import useTranslation from "next-translate/useTranslation";
import { Input } from "components/Input";
import { Button } from "components/Button";
import AuthLayout from "layout/auth";
import { useAuth } from "context/Auth";
import { instance } from "fetchApi";
import { IRegisterInfo, IRegisterInfoError } from "types";

export default function Signin() {
  const { t } = useTranslation("common");
  const { setIsAuthenticated } = useAuth();

  const [values, setValues] = useState<IRegisterInfo>({
    email: "",
    password: "",
    device_name: "web",
  });
  const [errors, setErrors] = useState<IRegisterInfo>({
    email: "",
    password: "",
  });

  // make a request to login
  const { isLoading, mutate } = useMutation(
    async () => {
      return await instance.post(`auth/login`, values);
    },
    {
      onSuccess: (res) => {
        Cookies.set("token-test", res.data.data.token);
        setErrors({
          email: "",
          password: "",
        });
        setIsAuthenticated(true);
      },
      onError: (err: IRegisterInfoError) => {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      },
    }
  );

  //update input value
  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return (
    <>
      <Head>
        <title>{t("sign_in")}</title>
      </Head>
      <h1 className="text-center text-3xl font-bold text-white mt-[44px]">
        {t("welcome")}
      </h1>
      <form className="flex flex-col gap-6 p-6" autoComplete="off">
        <Input
          label={t("email")}
          placeholder={t("email_address")}
          name="email"
          onChange={handleInputChange}
          error={errors.email}
        />
        <Input
          label={t("password")}
          placeholder={t("password")}
          name="password"
          onChange={handleInputChange}
          error={errors.password}
          type="password"
        />
        <Button
          loading={isLoading}
          onClick={mutate}
          text={t("login")}
          type="primary"
        />
        <div className="mt-8 text-white text-xs font-semibold text-center">
          {t("no_account")}
          <Link href="/signup">
            <a className="ml-2">{t("sign_up")}</a>
          </Link>
        </div>
      </form>
    </>
  );
}

Signin.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
