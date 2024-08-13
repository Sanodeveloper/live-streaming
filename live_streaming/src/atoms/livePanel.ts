import { atom } from "jotai";
import { SearchQuery } from "../interfaces/searchInterface";
import { LiveInterface } from "../interfaces/roomDataInterface";

const liveDataAtom = atom<LiveInterface[]>([]);

//const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

export const liveInitialDataAtom = atom(null,
    async (_get, set) => {
        const url = import.meta.env.VITE_BACK_API_URL ?? "";
        const respondes = await fetch(`${url}/search?tags=&keywords=`);
        if (!respondes.ok) {
            throw new Error("fetch failed");
        }

        const results: LiveInterface[] = await respondes.json();
        set(liveDataAtom, results);
    }
);

export const searchLiveInfoAtom = atom((get) => {
    return get(liveDataAtom);
}, async (_get, set, { tags, keywords }: SearchQuery) => {
    const url = import.meta.env.VITE_BACK_API_URL ?? "";
    const respondes = await fetch(`${url}/search?tags=${tags}&keywords=${keywords}`);
    if (!respondes.ok) {
        console.log("fetch failed");
        throw new Error("fetch failed");
    }


    const results: LiveInterface[] = await respondes.json();
    set(liveDataAtom, results);
});