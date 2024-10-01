import AgoraRTC, { AgoraRTCScreenShareProvider, ILocalAudioTrack, ILocalVideoTrack, LocalAudioTrack, LocalVideoTrack, useJoin, usePublish, useTrackEvent } from "agora-rtc-react";
import { useEffect, useState } from "react";

export default function ScreenShare({ screenShareOn, onCloseScreen, screenTrack, channel }: { screenShareOn: boolean; onCloseScreen: () => void; screenTrack: ILocalVideoTrack; channel: string }): JSX.Element {

    const [client] = useState(() => AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));

    const [screenVideoTrack, setScreenVideoTrack] = useState<ILocalVideoTrack | null>(null);
    const [screenAudioTrack, setScreenAudioTrack] = useState<ILocalAudioTrack | null>(null);

    const appId = import.meta.env.VITE_AGORA_APP_ID ?? "";

    useJoin({ appid: appId, channel: channel, token: null }, screenShareOn, client);

    useEffect(() => {
        if (!screenTrack) {
            setScreenVideoTrack(null);
            setScreenAudioTrack(null);
        } else {
            if (Array.isArray(screenTrack)) {
                setScreenVideoTrack(
                    screenTrack.filter(
                        (track) => track.trackMediaType === "video",
                    )[0] as ILocalVideoTrack,
                );

                setScreenAudioTrack(
                    screenTrack.filter(
                        (track) => track.trackMediaType === "audio",
                    )[0] as ILocalAudioTrack
                );
            } else {
                setScreenVideoTrack(screenTrack);
            }
        }
    }, [screenTrack]);

    usePublish([screenVideoTrack, screenAudioTrack], screenShareOn, client);

    useTrackEvent(screenVideoTrack, "track-ended", () => {
        //console.log("Track ended");
        onCloseScreen();
    });

    return (
        <AgoraRTCScreenShareProvider client={client}>
            {screenShareOn && screenVideoTrack && (
                <LocalVideoTrack
                    disabled={!screenShareOn}
                    play={screenShareOn}
                    track={screenVideoTrack}
                />
            )}
            {screenVideoTrack == null &&
                <div className="w-full h-full bg-black"></div>
            }
            {screenAudioTrack && <LocalAudioTrack disabled={!screenShareOn} track={screenAudioTrack} />}
        </AgoraRTCScreenShareProvider>
    );
}
