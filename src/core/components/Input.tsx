import type {
  FieldError,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
  placeholder: string;
  error?: FieldError;
  type?: string;
};

export default function Input<T extends FieldValues>({
  label,
  name,
  register,
  required,
  placeholder,
  error,
  type,
}: FormInputProps<T>) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-text-primary mb-2"
      >
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        required={required}
        className="w-full px-4 py-3 bg-black-700 border border-elegant-purple rounded-lg focus:border-accent-purple focus:shadow-elegant-purple outline-none transition-all duration-300 text-text-primary placeholder-text-muted"
        placeholder={placeholder}
      />

      {error && <p className="text-error mt-1 text-sm">{error.message}</p>}
    </div>
  );
}
