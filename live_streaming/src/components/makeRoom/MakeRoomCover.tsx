import { Suspense, useState } from "react";
import Sideber from "../sideber/Sideber";
import MakeRoom from "./MakeRoom";
import { ErrorBoundary } from "../errorHandling/err";
import Error from "../auth/Error";

export default function MakeRoomCover(): JSX.Element {
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <div className="flex flex-row-reverse justify-end">
            <main className="w-full p-8 flex h-fit">
                <ErrorBoundary fallback={<Error />}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <MakeRoom />
                    </Suspense>
                </ErrorBoundary>
            </main>
            <aside className={`${toggle ? "w-[5%] duration-300" : "w-1/5"} min-h-screen`}>
                <Sideber toggle={toggle} setToggle={setToggle} />
            </aside>
        </div>
    )
}