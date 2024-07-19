"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import useUser from "@/hooks/useUser";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string; }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signUp } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const doRegister: SubmitHandler<{ email: string; password: string; }> = async (
    formData
  ) => {
    setLoading(true);
    const error = await signUp({
      email: formData.email,
      password: formData.password,
    });
    setLoading(false);

    if (error) {
      setSignUpError(error.message);
    } else {
      setSignUpError(null);
      router.push("/");
    }
  };

  return (
    <main className="max-w-[1000px] mx-auto py-6">
      <div className="px-6 py-10 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">新規会員登録</h1>
        <form onSubmit={handleSubmit(doRegister)} className="w-full max-w-md mx-auto">
          <div className="mb-4">
            <p className="mb-2 font-medium">メールアドレス</p>
            <input
              id="email"
              placeholder="メールアドレス"
              {...register("email", {
                required: {
                  value: true,
                  message: "メールアドレスを入力してください",
                },
                pattern: {
                  value:
                    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
                  message: "有効なメールアドレスを入力してください",
                },
              })}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-4">
            <p className="mb-2 font-medium">パスワード</p>
            <input
              id="password"
              type="password"
              placeholder="パスワード"
              {...register("password", {
                required: {
                  value: true,
                  message: "パスワードを入力してください",
                },
                minLength: {
                  value: 6,
                  message: "パスワードは6文字以上にしてください",
                },
              })}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.password && (
              <div className="text-red-500 text-sm">
                {errors.password.message}
              </div>
            )}
          </div>

          {signUpError && (
            <div className="text-red-500 text-sm mb-4">既に登録されているアカウントです。</div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            disabled={loading}
          >
            {loading ? "登録中..." : "新規アカウント作成"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;