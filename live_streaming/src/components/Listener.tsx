import { useNavigate } from "react-router-dom"
import { RemoteUser, useJoin, useRemoteUsers } from "agora-rtc-react";

export default function Listener(): JSX.Element {
    const navi = useNavigate();

    useJoin({ appid: "afc107ff3419442db93ec89a836047b1", channel: "test", token: null });

    const remoteUsers = useRemoteUsers();
    console.log(remoteUsers);

    return (
        <>

            <div className="w-96 h-96 mx-auto mt-9">
                {remoteUsers.map((user) => {
                    if (user.hasVideo || user.hasAudio) {
                        return <RemoteUser key={user.uid} user={user} playVideo={user.videoTrack !== null} cover={"https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"} />
                    }
                })}
            </div>
            <div>
                <button onClick={() => navi("/")}>Go Back</button>
            </div>

        </>
    )
}