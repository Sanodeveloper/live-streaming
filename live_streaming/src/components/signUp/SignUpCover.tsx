import { useState } from "react";
import Sideber from "../sideber/Sideber";
import SignUp from "./SignUp";


export default function SignUpCover(): JSX.Element {
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <div className="flex flex-row-reverse justify-end">
            <main className="w-full p-16">
                <SignUp />
            </main>
            <aside className={`${toggle ? "w-[5%] duration-300" : "w-1/5"} min-h-screen`}>
                <Sideber toggle={toggle} setToggle={setToggle} />
            </aside>
        </div>
    )
}