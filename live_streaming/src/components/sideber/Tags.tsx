import { useAtomValue } from "jotai";
import { tagsAtom } from "../../atoms/tags";

export default function Tags({ onSetTags }: { onSetTags: (tag: string) => void }): JSX.Element {
    const tagList = useAtomValue(tagsAtom);
    return (
        <div className="mt-7 mb-10">
            {tagList.map((tag) => { return <button onClick={() => { onSetTags(tag) }} key={tag} className="rounded border-0 bg-white inline-block p-0.5 mr-3 mb-3">{tag}</button> })}
        </div>
    )
}