import type {
  FieldError,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";

type SelectOption = {
  value: string;
  label: string;
};

type FormSelectProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
  placeholder?: string;
  error?: FieldError;
  options: SelectOption[];
};

export default function SelectMenu<T extends FieldValues>({
  label,
  name,
  register,
  required,
  placeholder = "Select an option",
  error,
  options,
}: FormSelectProps<T>) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <select
        {...register(name)}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary-500 focus:border-transparent outline-none transition bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}