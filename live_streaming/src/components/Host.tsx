import { useEffect, useState } from "react";
import ScreenShare from "./screenshareandvideo/ScreenShare";
import VideoStream from "./screenshareandvideo/VideoStream";
import { ILocalVideoTrack, useJoin, useLocalScreenTrack } from "agora-rtc-react";

export default function Host(): JSX.Element {

    const [mic, setMic] = useState(false);
    const [cam, setCam] = useState(true);
    const [toggle, setToggle] = useState(false);

    useJoin({ appid: "afc107ff3419442db93ec89a836047b1", channel: "test", token: null });

    const { screenTrack, error } = useLocalScreenTrack(toggle, {}, "auto");

    useEffect(() => {
        setToggle(false);
    }, [error]);

    return (
        <>
            <div className="w-96 h-96 mx-auto mt-9">
                {toggle &&
                    <ScreenShare screenShareOn={toggle} onCloseScreen={() => setToggle(false)} screenTrack={screenTrack as ILocalVideoTrack} channel="test" />
                }
                <VideoStream videoTrackOn={!toggle} mic={mic} cam={cam} />
            </div>
            <div>
                <button onClick={() => setCam(c => !c)}>Camera</button>
                <button onClick={() => setMic(m => !m)}>Audio</button>
            </div>
            <div>
                <button onClick={() => { setToggle(t => !t) }}>shared screen</button>
            </div>
        </>
    )
}