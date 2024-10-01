import { LocalUser, useLocalCameraTrack, useLocalMicrophoneTrack, usePublish } from "agora-rtc-react";
export default function VideoStream({ cam, mic, videoTrackOn }: { cam: boolean; mic: boolean, videoTrackOn: boolean }): JSX.Element {
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(mic);
    const { localCameraTrack } = useLocalCameraTrack(cam);

    usePublish([localCameraTrack, localMicrophoneTrack]);

    return (
        <>
            <div className={`w-full h-full ${videoTrackOn ? "" : "hidden"}`}>
                <LocalUser
                    videoTrack={localCameraTrack}
                    cameraOn={cam && videoTrackOn}
                    audioTrack={localMicrophoneTrack}
                    micOn={mic && videoTrackOn}
                    cover={"https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"}
                />
            </div>
        </>
    );
}