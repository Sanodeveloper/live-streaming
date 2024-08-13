
import { Suspense, useState } from "react";
import Sideber from "../sideber/Sideber";
import GridLivePanels from "./GridLivePanels";
import { ErrorBoundary } from "../errorHandling/err";

export default function Home(): JSX.Element {

    const [toggle, setToggle] = useState<boolean>(false);
    return (
        <>
            <ErrorBoundary fallback={<div>Search Error... Try it agein in a few minutes</div>}>
                <div className="flex flex-row-reverse justify-end min-h-screen">
                    <main className="w-full grid gap-10 p-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        <Suspense fallback={<div>Loading...</div>}>
                            <GridLivePanels />
                        </Suspense>
                    </main>
                    <aside className={`${toggle ? "w-[5%] duration-300" : "w-1/5"} min-h-screen`}>
                        <Suspense fallback={<div className="h-full bg-[#FF4E59] px-5 pt-6 text-white text-center">Loading...</div>}>
                            <Sideber toggle={toggle} setToggle={setToggle} />
                        </Suspense>
                    </aside>
                </div >
            </ErrorBoundary>
        </>
    )
}