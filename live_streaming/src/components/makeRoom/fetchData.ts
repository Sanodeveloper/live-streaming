import { MakeRoomInterface } from "../../interfaces/roomDataInterface";

export const fetchData = async (roomInfo: MakeRoomInterface) => {
    const url = import.meta.env.VITE_BACK_API_URL ?? "";
    const response = await fetch(`${url}/room/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(roomInfo),
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("fetch failed");
    }
    return response.json();
}