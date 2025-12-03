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
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary-500 focus:border-transparent outline-none transition"
        placeholder={placeholder}
      />

      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}
