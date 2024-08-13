import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Dispatch, SetStateAction, Suspense, useState } from "react";
import { Link } from "react-router-dom";

import Search from "./Search";
import Menu from "./Menu";
import { ErrorBoundary } from "../errorHandling/err";
import Tags from "./Tags";


export default function Sideber({ toggle, setToggle }: { toggle: boolean; setToggle: Dispatch<SetStateAction<boolean>> }): JSX.Element {
    const [tags, setTags] = useState<string[]>([]);
    const onSetTags = (tag: string): void => {
        setTags([tag, ...tags]);
    }

    return (
        <div className="h-full bg-[#FF4E59] px-5 pt-6">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="inline-block w-[80%]"><Link to="/" reloadDocument={true}><img src="/live.png" alt="logo"></img></Link></h1>
                <button onClick={() => { setToggle(s => !s) }}>
                    {toggle ? <MdKeyboardArrowRight className="text-white text-3xl inline duration-150" />
                        : <MdKeyboardArrowLeft className="text-white text-3xl inline duration-150" />}
                </button>
            </div>
            <div className={`${toggle ? "hidden" : ""} duration-150`}>
                <ErrorBoundary fallback={<div className="text-white">Search Error</div>}>
                    <Suspense fallback={<div className="text-white">Loading...</div>}>
                        <Search tags={tags} />
                        <Tags onSetTags={onSetTags} />
                        <Menu />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    )
}