import { useEffect, useState } from "react";
import { useJoin, useLocalScreenTrack, ILocalVideoTrack } from "agora-rtc-react";
import { useMutation } from "@tanstack/react-query";

import ScreenShare from "../screenshareandvideo/ScreenShare";
import VideoStream from "../screenshareandvideo/VideoStream";
import { fetchData } from "./fetchData";
import { MakeRoomInterface } from "../../interfaces/roomDataInterface";
import { useNavigate } from "react-router-dom";

export default function MakeRoom(): JSX.Element {

    //Agoraの設定
    const appId = import.meta.env.VITE_AGORA_APP_ID ?? "";
    const [cameraOn, setCameraOn] = useState<boolean>(true);
    const [micOn, setMicOn] = useState<boolean>(true);
    const [screenShareOn, setScreenShareOn] = useState<boolean>(false);

    useJoin({ appid: appId, channel: "createRoom", token: null });

    const { screenTrack, error } = useLocalScreenTrack(screenShareOn, {}, "auto");

    useEffect(() => {
        setScreenShareOn(false);
    }, [error]);

    //サブミットボタンが押された時の処理
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: (roominfo: MakeRoomInterface) => {
            return fetchData(roominfo);
        },
        onSuccess: (data) => {
            console.log(typeof data.roomId);
            navigate(`/room/host/${data.roomId}`);
        },
        throwOnError: true,
    })
    const [lengthError, setLengthError] = useState<boolean>(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        if (title.length > 40 || title.length === 0) {
            setLengthError(true);
            return;
        }
        const description = formData.get("description") as string;
        const tags = formData.get("tags") as string;
        const tagList = tags.split(" ");
        // Add your logic here to handle the form data

        const roomInfo: MakeRoomInterface = {
            title: title,
            info: description,
            tags: tagList,
            roomState: {
                camOn: cameraOn,
                micOn: micOn,
                screenShareOn: screenShareOn,
            }
        }
        mutate(roomInfo);
    }

    return (
        <>
            <div className="w-[70%] h-[80vh]">
                {screenShareOn &&
                    <ScreenShare screenShareOn={screenShareOn} onCloseScreen={() => setScreenShareOn(false)} screenTrack={screenTrack as ILocalVideoTrack} channel="createRoom" />
                }
                <VideoStream videoTrackOn={!screenShareOn} mic={micOn} cam={cameraOn} />
                <div className="mt-4">
                    <button className="bg-[#FF4E59] border border-[#FF4E59] text-white p-2 rounded w-[15%] hover:bg-white hover:text-[#FF4E59] mr-4" onClick={() => setCameraOn(!cameraOn)}>カメラ{cameraOn ? "OFF" : "ON"}</button>
                    <button className="bg-[#FF4E59] border border-[#FF4E59] text-white p-2 rounded w-[15%] hover:bg-white hover:text-[#FF4E59] mr-4" onClick={() => setMicOn(!micOn)}>マイク{micOn ? "OFF" : "ON"}</button>
                    <button className="bg-[#FF4E59] border border-[#FF4E59] text-white p-2 rounded w-[20%] hover:bg-white hover:text-[#FF4E59] mr-4" onClick={() => setScreenShareOn(!screenShareOn)}>画面共有{screenShareOn ? "OFF" : "ON"}</button>
                </div>
            </div>
            <form className="p-6 w-[30%] flex flex-col justify-between" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="text-xl border-b border-black p-1 mb-2 inline-block" htmlFor="title">タイトル<span className="text-sm text-gray-400 ml-3">- 40文字以下</span></label>
                    <input className="border rounded border-gray-500 w-full p-[2px]" type="text" id="title" name="title" />
                    {lengthError && <p className="text-red-500 text-sm mt-3">タイトルは40文字以下で入力してください</p>}
                </div>
                <div className="mb-6">
                    <label className="text-xl border-b border-black p-1 mb-2 inline-block" htmlFor="about">概要<span className="text-sm text-gray-400 ml-3">- 2000文字以下</span></label>
                    <textarea className="border rounded border-gray-500 w-full h-32 p-[2px]" id="about" name="description" />
                </div>
                <div className="mb-40">
                    <label className="text-xl border-b border-black p-1 mb-2 inline-block" htmlFor="tags">タグ付け<span className="text-sm text-gray-400 ml-3">- 空白（スペース）で区切る</span></label>
                    <input className="border rounded border-gray-500 w-full p-[2px]" type="text" id="tags" name="tags" />
                </div>
                <div className="text-center">
                    <button className="bg-[#FF4E59] border border-[#FF4E59] text-white p-2 rounded w-[70%] hover:bg-white hover:text-[#FF4E59]" type="submit">配信する</button>
                    {isPending && <p className="text-center mt-4">配信準備中です。しばらくお待ちください。</p>}
                </div>
            </form>
        </>
    )
}