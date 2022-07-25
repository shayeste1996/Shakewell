import { ReactNode, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { instance } from "fetchApi";
import useTranslation from "next-translate/useTranslation";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import AuthLayout from "@layout/auth";
import { useAuth } from "context/Auth";

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

export default function Verfiy() {
  const { t } = useTranslation("common");
  const { setIsAuthenticated } = useAuth();

  const [values, setValues] = useState<IUser>({
    email: "",
    password: "",
    device_name: "web",
  });
  const [errors, setErrors] = useState<IUser>({
    email: "",
    password: "",
  });
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
  return (
    <div className="flex flex-col mx-auto py-10 text-white text-center">
      <h1 className=" text-3xl font-bold my-10">{t("verfiy_email")}</h1>
      <div className="text-[18px]">{t("email_desc1")}</div>
      <p className="font-bold mt-3 text-[19px]">emashayeste@gmail.comil</p>
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

Verfiy.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
