import { useState } from "react";
import ListenerRoom from "./ListenerRoom";

export default function PrepareListener(): JSX.Element {
    const [hasName, setHasName] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const handleEnter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = (e.currentTarget.querySelector("#name") as HTMLInputElement).value;
        if (name === "") {
            setError("名前を入力してください");
            return;
        }
        setName(name);
        setHasName(true);
    }
    return (
        <div>
            {hasName ?
                <ListenerRoom name={name} />
                :
                <div className="h-screen flex justify-center items-center">
                    < form className="w-full flex flex-col justify-center items-center" onSubmit={handleEnter}  >
                        <label className="text-xl mb-5" htmlFor="name">名前を入力してください</label>
                        <input type="text" id="name" className="w-[30%] border border-gray-500 rounded p-2 mb-10" />
                        <button type="submit" className="w-[20%] bg-[#FF4E59] border border-[#FF4E59] text-white p-2 rounded mb-2 hover:bg-white hover:text-[#FF4E59]">入室</button>
                        {error && <p className="text-red-400">{error}</p>}
                    </form >
                </div >
            }
        </div>
    )
}