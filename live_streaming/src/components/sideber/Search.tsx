import { IoMdSearch } from "react-icons/io";

import { useSetAtom } from "jotai";
import { searchLiveInfoAtom } from "../../atoms/livePanel";
import { useNavigate } from "react-router-dom";
export default function Search({ tags }: { tags: string[] }): JSX.Element {

    /**
     * タグで検索するための関数
     */
    let tagCount: number = 0;
    tags.forEach((tag) => {
        if (tag === ":") {
            tagCount++;
        }
    });

    if (tagCount === 0 && tags.length !== 0) {
        tags.push(":");
    }
    const tag: string = tags.join(" ");

    const setSearchData = useSetAtom(searchLiveInfoAtom);

    /**
     * formタグでサブミットされた時の処理
     */
    const navigate = useNavigate();
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const searchInfo = data.get("searchInfo") as string;
        const tagAndKeyword = searchInfo.split(":");
        const trimedTagAndKeyword = tagAndKeyword.map((tag) => {
            return tag.trim();
        });

        if (trimedTagAndKeyword.length === 1) {
            trimedTagAndKeyword.unshift("");
        }

        setSearchData({ tags: trimedTagAndKeyword[0], keywords: trimedTagAndKeyword[1] });
        navigate("/");
    }

    return (
        <div>
            <form className="relative" onSubmit={onSubmit}>
                <input className="border-solid border rounded border-black w-full pr-6 pl-2 py-1" type="text" name="searchInfo" placeholder="検索..." defaultValue={tag} />
                <button className="absolute top-1/2 -translate-y-1/2 right-2" type="submit" ><IoMdSearch /></button>
            </form>
            <p className="text-xs text-white mt-2">キーワード検索は半角のスペース（空白）で区切ってください</p>
        </div>
    )
}