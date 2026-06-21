export interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  action: (formData: FormData) => void | Promise<void>;
  locale: string;
}
