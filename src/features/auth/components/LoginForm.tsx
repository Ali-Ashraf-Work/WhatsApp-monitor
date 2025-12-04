import { useForm } from "react-hook-form";
import Input from "../../../core/components/Input";
import type { UserCredentials } from "../types/AuthTypes";
import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<UserCredentials>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login } = useLogin();

  const onSubmit = (data: UserCredentials) => {
    login(data);
    reset();
  };

  return (
    <div>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          name="email"
          placeholder="example@gmail.com"
          type="email"
          required
          register={register}
        />

        <Input
          label="Password"
          name="password"
          placeholder="••••••••"
          type="password"
          required
          register={register}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-linear-to-r from-accent-purple to-accent-blue hover:from-accent-blue hover:to-accent-purple text-text-primary font-semibold py-3.5 rounded-lg transition-all duration-300 hover-elegant shadow-elegant-purple disabled:opacity-50 disabled:cursor-not-allowed disabled:from-black-600 disabled:to-black-600"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}
