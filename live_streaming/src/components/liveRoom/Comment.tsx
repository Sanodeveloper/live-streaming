import { useEffect, useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CommentInterface } from "../../interfaces/roomDataInterface"
import io from "socket.io-client";

export default function Comment({ roomId, name, handleNum }: { roomId: number; name: string; handleNum: (num: number) => void }): JSX.Element {
    //get comment data
    const { data } = useSuspenseQuery<CommentInterface[]>({
        queryKey: ["comments", roomId],
        queryFn: async () => {
            const url = import.meta.env.VITE_BACK_API_URL ?? "";
            const response = await fetch(`${url}/room/comments/${roomId}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }
    });
    const [comments, setComments] = useState<CommentInterface[]>(data ?? []);

    //socket connection
    const socket = useRef<SocketIOClient.Socket | null>(null);

    useEffect(() => {
        const url = import.meta.env.VITE_SOCKET_API_URL;
        socket.current = io(`${url}/`, { reconnectionDelay: 500 });

        socket.current.on('connect', () => {
            console.log("Connected Correctlly");
            socket.current?.emit('join', JSON.stringify({ roomId }));
        });

        socket.current.on('message', (data: string) => {
            const messageInfo = JSON.parse(data);
            setComments((prev) => [{ userName: messageInfo.name, comment: messageInfo.message }, ...prev]);
        });

        socket.current.on('join', (num: number) => {
            console.log(num);
            handleNum(num);
        });

        socket.current.on('leave', (num: number) => {
            console.log(num);
            handleNum(num);
        });

        return () => {
            socket.current?.emit('leave', JSON.stringify({ roomId }));
            socket.current?.disconnect();
        }
    }, []);

    //handle comment function to send comment to server
    const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const comment = formData.get("comment") as string;
        if (comment === "") {
            return;
        }
        socket.current?.emit('message', JSON.stringify({ roomId, message: comment, name: name }));
        e.currentTarget.reset();
    }
    return (
        <>
            <div className="border-y border-gray-600 h-[80%] mb-5 overflow-scroll overflow-x-hidden">
                {comments.map((comment, index) => (
                    <div key={index} className="border-b border-gray-600 last:border-none p-2">
                        <p className="font-bold">{comment.userName}</p>
                        <p className="ml-2 text-sm break-all">{comment.comment}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleComment} noValidate>
                <input type="text" className="w-[80%] border border-gray-500 rounded p-2" name="comment" placeholder="コメントを入力" />
                <button type="submit" className="w-[20%] bg-[#FF4E59] border border-[#FF4E59] text-white p-2 rounded hover:bg-white hover:text-[#FF4E59]">送信</button>
            </form>
        </>
    )
}