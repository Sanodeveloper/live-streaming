import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function Menu(): JSX.Element {
    const { data } = useSuspenseQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const url = import.meta.env.VITE_BACK_API_URL ?? "";
            const response = await fetch(`${url}/auth`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            if (!response.ok && response.status !== 401) {
                throw new Error("fetch failed");
            }
            return response.json();
        },
    });
    return (
        <div className="border-t border-b">
            <ul>
                <li className="text-white p-4 flex justify-start items-center"><FaRegArrowAltCircleRight className="inline-block mr-4" /><Link className="hover:opacity-70" to="/sign-up">新規登録する</Link></li>
                <li className="text-white p-4 flex justify-start items-center"><FaRegArrowAltCircleRight className="inline-block mr-4" /><Link className="hover:opacity-70" to="/login">ログイン</Link></li>
                {data.isAuth &&
                    <li className="text-white p-4 flex justify-start items-center"><FaRegArrowAltCircleRight className="inline-block mr-4" /><Link className="hover:opacity-70" to="/room/make-room">配信する</Link></li>
                }
            </ul>
        </div>
    )
}