import { useSuspenseQuery } from "@tanstack/react-query"

export default function Auth(): JSX.Element {

    useSuspenseQuery({
        queryKey: ["auth"],
        queryFn: async () => {
            const url = import.meta.env.VITE_BACK_API_URL;
            const response = await fetch(`${url}/auth`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch");
            }

            return response.json();
        }
    });

    return (
        <></>
    )
}