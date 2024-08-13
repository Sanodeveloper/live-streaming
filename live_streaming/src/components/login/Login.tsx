import { useMutation } from "@tanstack/react-query";
import { fetchData } from "./fetchData";
import { LoginInterface } from "../../interfaces/loginInterface";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login(): JSX.Element {

    //ログイン処理
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [scucessMsg, setScucessMsg] = useState<string>("");
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const { mutate, isPending } = useMutation({
        mutationFn: ({ name, password }: LoginInterface) => {
            return fetchData({ name, password });
        },
        onError(error) {
            setIsLogin(false);
            if (error.message === "User not found") {
                setErrorMsg("ユーザーが見つかりませんでした");
            } else {
                setErrorMsg("サーバーのエラーによりログインできませんでした");
            }
        },
        onSuccess() {
            setIsLogin(true);
            setScucessMsg("ログインできました");
        }
    });

    //サブミットボタンが押された時の処理
    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const password = formData.get("password") as string;
        mutate({ name, password });
    }

    return (
        <div className="border border-gray-700 max-w-[500px] mx-auto p-10">
            <h2 className="border-b border-gray-500 text-center text-xl p-1 mb-10">ログイン</h2>
            <form onSubmit={handleSignUp} noValidate>
                <div className="mb-6">
                    <label className="mb-2 inline-block" htmlFor="name">名前</label>
                    <input className="block border border-gray-500 rounded w-[80%] p-1" type="text" id="name" name="name" />
                </div>
                <div className="mb-20">
                    <label className="mb-2 inline-block" htmlFor="password">パスワード</label>
                    <input className="block border border-gray-500 rounded w-[80%] p-1" type="password" id="password" name="password" />
                </div>
                <div className="text-center">
                    <button className="bg-[#FF4E59] border border-[#FF4E59] text-white p-1 rounded w-[50%] hover:bg-white hover:text-[#FF4E59]" type="submit">ログインする</button>
                </div>
                {isPending && <p className="text-center mt-4">ログイン中...</p>}
                {isLogin ?
                    <div className="flex justify-evenly items-center mt-10">
                        <p className="text-center text-green-500">{scucessMsg}</p>
                        <button className="bg-green-500 border border-green-500 text-white p-1 rounded w-[30%] hover:bg-white hover:text-green-500" onClick={() => navigate("/room/make-room")}>配信はこちらから</button>
                    </div>
                    :
                    <p className="text-center mt-4 text-red-500">{errorMsg}</p>
                }
            </form>
        </div>
    )
}