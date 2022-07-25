export interface IButton {
  text: string;
  type?: string;
  btnType?: "button" | "submit" | "reset" | undefined;
  onClick: () => void;
  loading?: boolean;
}
