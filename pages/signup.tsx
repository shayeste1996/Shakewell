import { ReactNode, useState } from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useMutation } from "@tanstack/react-query";
import { instance } from "fetchApi";
import Cookies from "js-cookie";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import AuthLayout from "@layout/auth";
import { useAuth } from "context/Auth";

interface IUser {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  username: string;
}
interface IError {
  response: {
    data: {
      errors: IUser;
    };
  };
}

export default function Signup() {
  const { t } = useTranslation("common");
  const { setIsAuthenticated } = useAuth();

  const [values, setValues] = useState<IUser>({
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    username: "",
  });
  const [errors, setErrors] = useState<IUser>({
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    username: "",
  });
  const { isLoading, mutate } = useMutation(
    async () => {
      return await instance.post(`auth/register`, {
        ...values,
        password_confirmation: values.password,
      });
    },
    {
      onSuccess: (res) => {
        console.log(res.data.data);
        Cookies.set("token-test", res.data.data.token);
        setErrors({
          email: "",
          password: "",
          password_confirmation: "",
          first_name: "",
          last_name: "",
          username: "",
        });
        setIsAuthenticated(true);
      },
      onError: (err: IError) => {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      },
    }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  console.log('auth sign up')

  return (
    <>
      <h1 className="text-center text-lg text-white mt-[44px] font-bold">
        {t("sign_up")}
      </h1>
      <form className="flex flex-col gap-6 p-6" autoComplete="off">
        <Input
          label={t("first_name")}
          placeholder={t("first_name")}
          name="first_name"
          onChange={handleInputChange}
          error={errors.first_name}
        />
        <Input
          label={t("last_name")}
          placeholder={t("last_name")}
          name="last_name"
          onChange={handleInputChange}
          error={errors.last_name}
        />
        <Input
          label={t("username")}
          placeholder={t("username")}
          name="username"
          onChange={handleInputChange}
          error={errors.username}
        />
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
          text={t("next")}
          type="primary"
          onClick={mutate}
          loading={isLoading}
        />
        <div className="mt-8 text-white text-xs font-semibold text-center">
          {t("have_account")}
          <Link href="/signin">
            <a className="ml-2">{t("sign_in")}</a>
          </Link>
        </div>
      </form>
    </>
  );
}

Signup.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
