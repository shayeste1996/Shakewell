export interface IInput {
  label?: string;
  placeholder?: string;
  name?: string;
  error?: string;
  type?: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}
