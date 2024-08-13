import { HostRoomInterface } from "../../interfaces/roomDataInterface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import Comment from "./Comment";
import { ILocalVideoTrack, useJoin, useLocalScreenTrack } from "agora-rtc-react";
import ScreenShare from "../screenshareandvideo/ScreenShare";
import VideoStream from "../screenshareandvideo/VideoStream";
import { useParams } from "react-router-dom";

export default function HostRoom(): JSX.Element {

    //redirect if roomId is undefined
    const navigate = useNavigate();

    const { roomId } = useParams<{ roomId: string }>();
    if (roomId === undefined) {
        navigate("/");
    }

    //get roomInfo from server
    const { data } = useSuspenseQuery<HostRoomInterface>({
        queryKey: ["hostRoom"],
        queryFn: async () => {
            const url = import.meta.env.VITE_BACK_API_URL ?? "";
            const response = await fetch(`${url}/room/host/${roomId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
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
    const [cameraOn, setCameraOn] = useState<boolean>(data.roomState.camOn);
    const [micOn, setMicOn] = useState<boolean>(data.roomState.micOn);
    const [screenShareOn, setScreenShareOn] = useState<boolean>(data.roomState.screenShareOn);

    useJoin({ appid: appId, channel: data.roomId.toString(), token: null });

    const { screenTrack, error } = useLocalScreenTrack(screenShareOn, {}, "auto");

    useEffect(() => {
        setScreenShareOn(false);
    }, [error]);

    const { mutate } = useMutation({
        mutationFn: async () => {
            const url = import.meta.env.VITE_BACK_API_URL ?? "";
            const respomse = await fetch(`${url}/room/delete/${roomId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!respomse.ok) {
                throw new Error("fetch failed");
            }
            return respomse.json();
        },
        onSuccess: () => {
            navigate("/");
        },
        throwOnError: true,
    })

    //closeStream
    const onCloseStream = () => {
        mutate();
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
                <div className="h-[80vh] mb-4">
                    {screenShareOn &&
                        <ScreenShare screenShareOn={screenShareOn} onCloseScreen={() => setScreenShareOn(false)} screenTrack={screenTrack as ILocalVideoTrack} channel={data.roomId.toString()} />
                    }
                    <VideoStream videoTrackOn={!screenShareOn} mic={micOn} cam={cameraOn} />
                </div>
                <div className="mb-10 flex justify-between items-center">
                    <div className="w-[60%]">
                        <button className="bg-[#FF4E59] border border-[#FF4E59] text-white p-2 rounded w-[25%] hover:bg-white hover:text-[#FF4E59] mr-4" onClick={() => setCameraOn(!cameraOn)}>カメラ{cameraOn ? "OFF" : "ON"}</button>
                        <button className="bg-[#FF4E59] border border-[#FF4E59] text-white p-2 rounded w-[25%] hover:bg-white hover:text-[#FF4E59] mr-4" onClick={() => setMicOn(!micOn)}>マイク{micOn ? "OFF" : "ON"}</button>
                        <button className="bg-[#FF4E59] border border-[#FF4E59] text-white p-2 rounded w-[35%] hover:bg-white hover:text-[#FF4E59] mr-4" onClick={() => setScreenShareOn(!screenShareOn)}>画面共有{screenShareOn ? "OFF" : "ON"}</button>
                    </div>
                </div>
                <div>
                    <h2 className="border-b border-gray-500 inline-block px-2">概要</h2>
                    <p className=" p-4">{data.info}</p>
                </div>
            </div>
            <div className="w-[30%] h-[80vh] px-5 mt-12">
                <Comment roomId={data.roomId} name={data.distributor} handleNum={handleNum} />
            </div>
            <button className="fixed bottom-10 right-[10%] drop-shadow-md bg-[#FF4E59] border border-[#FF4E59] text-white p-2 rounded w-[10%] hover:bg-white hover:text-[#FF4E59]" onClick={onCloseStream}>配信を終了する</button>
        </div>
    )
}