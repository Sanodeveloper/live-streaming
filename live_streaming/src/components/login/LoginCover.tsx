import { useState } from "react";
import Sideber from "../sideber/Sideber";
import Login from "./Login";
import { ErrorBoundary } from "react-error-boundary";

export default function LoginCover(): JSX.Element {
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <div className="flex flex-row-reverse justify-end">
            <main className="w-full p-16">
                <ErrorBoundary fallback={<div>Failed to login. try it in a few minutes</div>}>
                    <Login />
                </ErrorBoundary>
            </main>
            <aside className={`${toggle ? "w-[5%] duration-300" : "w-1/5"} min-h-screen`}>
                <Sideber toggle={toggle} setToggle={setToggle} />
            </aside>
        </div>
    )
}