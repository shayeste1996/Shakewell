import { NextPage } from "next";
import { Spinner } from "@components/Spinner";

interface Props {
  text: string;
  type?: string;
  btnType?: "button" | "submit" | "reset" | undefined;
  onClick: () => void;
  loading?: boolean;
}

export const Button: NextPage<Props> = (props) => {
  const {
    text,
    type = "primary",
    btnType = "button",
    onClick,
    loading = false,
  } = props;

  return (
    <button
      type={btnType}
      onClick={onClick}
      disabled={loading}
      className={
        type === "primary"
          ? `bg-button-white p-4 text-white text-base rounded-[4px] flex justify-center items-center ${
              loading ? "cursor-not-allowed" : null
            }`
          : ""
      }
    >
      {loading ? <Spinner /> : text}
    </button>
  );
};
