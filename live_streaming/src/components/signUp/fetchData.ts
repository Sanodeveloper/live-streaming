import { SignUpInterface } from "../../interfaces/signUpInterface";

export const fetchData = async (userData: SignUpInterface) => {
    const url = import.meta.env.VITE_BACK_API_URL ?? "";
    const response = await fetch(`${url}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok && response.status !== 409) {
        throw new Error("fetch failed");
    }

    if (response.status === 409) {
        throw new Error("User already exists");
    }
}