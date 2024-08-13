import { Suspense, useState } from "react";
import Sideber from "../sideber/Sideber";
import { ErrorBoundary } from "../errorHandling/err";
import Error from "../auth/Error";
import HostRoom from "./HostRoom";

export default function HostRoomCover(): JSX.Element {
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <ErrorBoundary fallback={
            <div className="flex flex-row-reverse justify-end">
                <main className="w-full p-8 flex h-fit">
                    <Error />
                </main>
                <aside className={`${toggle ? "w-[5%] duration-300" : "w-1/5"} min-h-screen`}>
                    <Sideber toggle={toggle} setToggle={setToggle} />
                </aside>
            </div>
        }>
            <Suspense fallback={
                <div className="flex flex-row-reverse justify-end">
                    <main className="w-full p-8 flex h-fit">
                        <div>loading...</div>
                    </main>
                    <aside className={`${toggle ? "w-[5%] duration-300" : "w-1/5"} min-h-screen`}>
                        <Sideber toggle={toggle} setToggle={setToggle} />
                    </aside>
                </div>
            }>
                <HostRoom />
            </Suspense>
        </ErrorBoundary>
    )
}