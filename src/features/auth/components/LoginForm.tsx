import { useForm } from "react-hook-form";
import Input from "../../../core/components/Input";
import type { UserCredentials } from "../types/AuthTypes";
import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const { register, handleSubmit, reset } = useForm<UserCredentials>({
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
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="email"
          name="email"
          placeholder="example@gmail.com"
          type="text"
          required
          register={register}
        />

        <Input
          label="password"
          name="password"
          placeholder="••••••••"
          type="password"
          required
          register={register}
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
