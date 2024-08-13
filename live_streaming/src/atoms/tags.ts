import { atom } from "jotai";

// const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

export const tagsAtom = atom(async () => {
    const url = import.meta.env.VITE_BACK_API_URL ?? "";
    const response = await fetch(`${url}/tags`);
    if (!response.ok) {
        throw new Error("fetch failed");
    }

    const results = await response.json();
    const tagList: string[] = results.tags;
    return tagList;
});