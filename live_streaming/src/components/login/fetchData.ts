import { LoginInterface } from "../../interfaces/loginInterface";

export const fetchData = async ({ name, password }: LoginInterface) => {
    const url = import.meta.env.VITE_BACK_API_URL ?? "";
    const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
        credentials: "include"
    });
    console.log(response.ok);
    console.log(response.status);
    if (!response.ok && response.status !== 401) {
        throw new Error("fetch failed");
    }

    if (response.status === 401) {
        throw new Error("User not found");
    }
    return response.json();
}