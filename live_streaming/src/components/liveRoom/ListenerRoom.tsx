import { useParams } from "react-router-dom"
import { LiveInterface } from "../../interfaces/roomDataInterface";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import Comment from "./Comment";
import { RemoteUser, useJoin, useRemoteUsers } from "agora-rtc-react";
import { useState } from "react";

export default function ListenerRoom({ name }: { name: string }): JSX.Element {

    //redirect if roomId is undefined
    const navigate = useNavigate();
    const { roomId } = useParams<{ roomId: string }>();
    if (roomId === undefined) {
        navigate("/");
    }

    //get roomInfo from server
    const { data } = useSuspenseQuery<LiveInterface>({
        queryKey: ["listenerRoom"],
        queryFn: async () => {
            const url = import.meta.env.VITE_BACK_API_URL ?? "";
            const response = await fetch(`${url}/room/listener/${roomId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("fetch failed");
            }
            return response.json();
        }
    });

    const [num, setNum] = useState<number>(data.peopleNum);
    const handleNum = (num: number) => {
        setNum(num);
    }

    //Agoraの設定
    const appId = import.meta.env.VITE_AGORA_APP_ID ?? "";
    useJoin({ appid: appId, channel: data.roomId.toString(), token: null });
    const remoteUsers = useRemoteUsers();
    let count = 0;
    let isTrack = false;
    remoteUsers.forEach((user) => {
        console.log("----------------------------------------------")
        console.log(user.hasVideo);
        console.log(user.hasAudio);
        console.log("----------------------------------------------")
        if (user.hasVideo || user.hasAudio) {
            count++;
        }
    });
    if (count > 0) {
        isTrack = true;
    }


    const onCloseStream = () => {
        navigate("/");
    }

    return (
        <div className="p-8 flex">
            <div className="w-[70%]">
                <h1 className="flex justify-between mb-4">
                    <span className="text-2xl">{data.title}</span>
                    <span>
                        配信者<span className="text-2xl ml-3 mr-6">{data.distributor}</span>
                        視聴者数<span className="text-2xl ml-3">{num}人</span>
                    </span>
                </h1>
                <div className="h-[80vh] mb-10">
                    {remoteUsers.map((user) => {
                        if (user.hasVideo || user.hasAudio) {
                            return <RemoteUser key={user.uid} user={user} videoPlayerConfig={{ fit: "contain" }} />
                        }
                    })}
                    {isTrack ? "" : <div className="w-full h-full bg-black"></div>}
                </div>
                <div>
                    <h2 className="border-b border-gray-500 inline-block px-2">概要</h2>
                    <p className=" p-4">{data.info}</p>
                </div>
            </div>
            <div className=" w-[30%] h-[80vh] px-5 mt-12">
                <Comment roomId={data.roomId} name={name} handleNum={handleNum} />
            </div>
            <button className="fixed bottom-10 right-[10%] drop-shadow-md bg-[#FF4E59] border border-[#FF4E59] text-white p-2 rounded w-[10%] hover:bg-white hover:text-[#FF4E59]" onClick={onCloseStream}>配信を出る</button>
        </div >
    )
}