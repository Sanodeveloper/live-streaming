import { ReactNode, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { fetchData } from "./fetchData";
import { SignUpInterface } from "../../interfaces/signUpInterface";
import { useNavigate } from "react-router-dom";

export default function SignUp(): JSX.Element {

    const [userError, setUserError] = useState<string>("");

    //fetchを使った新規登録処理
    const navigate = useNavigate();
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: ({ name, email, password }: SignUpInterface) => {
            return fetchData({ name, email, password });
        },
        onError: (error) => {
            if (error.message === "User already exists") {
                setUserError("このユーザーは既に登録されています");
            } else {
                setUserError("エラーが発生しました。時間をおいて再度お試しください");
            }
        },
    });
    const handleSignUp: SubmitHandler<FieldValues> = (data) => {
        mutate({
            name: data.name,
            email: data.email,
            password: data.password,
        });
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <div className="border border-gray-700 max-w-[500px] mx-auto p-10">
            <h2 className="border-b border-gray-500 text-center text-xl p-1 mb-10">新規登録</h2>
            <form onSubmit={handleSubmit(handleSignUp)} noValidate>
                <div className="mb-6">
                    <label className="mb-2 inline-block" htmlFor="name"><span className="bg-red-400 text-white py-0.5 px-2 rounded mr-2">必須</span>名前</label>
                    <input className="block border border-gray-500 rounded w-[80%] p-1" type="text" id="name" placeholder="例）Taro"
                        {...register("name", {
                            required: "名前は必須です",
                            maxLength: {
                                value: 20,
                                message: "名前は20文字以下で入力してください"
                            }
                        })} />
                    <p className="text-sm text-red-500 mt-1">{errors.name?.message as ReactNode}</p>
                </div>
                <div className="mb-6">
                    <label className="mb-2 inline-block" htmlFor="email"><span className="bg-red-400 text-white py-0.5 px-2 rounded mr-2">必須</span>メールアドレス</label>
                    <input className="block border border-gray-500 rounded w-[80%] p-1" type="email" id="email" placeholder="例）taro@example.com"
                        {...register("email", {
                            required: "メールアドレスは必須です",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "正しいメールアドレスを入力してください"
                            }
                        })} />
                    <p className="text-sm text-red-500 mt-1">{errors.email?.message as ReactNode}</p>
                </div>
                <div className="mb-6">
                    <label className="mb-2 inline-block" htmlFor="password"><span className="bg-red-400 text-white py-0.5 px-2 rounded mr-2">必須</span>パスワード</label>
                    <ul className="text-sm text-gray-500 ml-4 mb-2 list-[circle] list-inside">
                        <li className="mb-1">8文字以上</li>
                        <li>半角英数字を含むこと</li>
                    </ul>
                    <input className="block border border-gray-500 rounded w-[80%] p-1" type="password" id="password"
                        {...register("password", {
                            required: "パスワードは必須です",
                            minLength: {
                                value: 8,
                                message: "パスワードは8文字以上で入力してください"
                            },
                            pattern: {
                                value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
                                message: "パスワードは半角英数字をそれぞれ1文字以上含む必要があります"
                            }
                        })} />
                    <p className="text-sm text-red-500 mt-1">{errors.password?.message as ReactNode}</p>
                </div>
                <div className="mb-8">
                    <label className="mb-2 inline-block" htmlFor="passwordConfirm"><span className="bg-red-400 text-white py-0.5 px-2 rounded mr-2">必須</span>パスワード確認</label>
                    <input className="block border border-gray-500 rounded w-[80%] p-1" type="password" id="passwordConfirm"
                        {...register("passwordConfirm", {
                            required: "パスワード確認は必須です",
                            validate: (value, { password }) => value === password || "パスワードが一致しません"
                        })} />
                    <p className="text-sm text-red-500 mt-1">{errors.passwordConfirm?.message as ReactNode}</p>
                </div>
                <div className="text-center">
                    <button className="bg-[#FF4E59] border border-[#FF4E59] text-white p-1 rounded w-[50%] hover:bg-white hover:text-[#FF4E59]" type="submit">新規登録する</button>
                </div>
                {isPending && <p className="text-center mt-4">送信中...</p>}
                {userError && <p className="text-center mt-4 text-red-500">{userError}</p>}
                {isSuccess &&
                    <div>
                        <p className="text-center mt-8 text-green-400">登録が完了しました ログインしてください</p>
                        <button className="block mx-auto mt-2 bg-[#FF4E59] border border-[#FF4E59] text-white p-1 rounded w-[50%] hover:bg-white hover:text-[#FF4E59]"
                            onClick={() => { navigate("/login") }}>ログイン画面へ</button>
                    </div>}
            </form>
        </div>
    )
}