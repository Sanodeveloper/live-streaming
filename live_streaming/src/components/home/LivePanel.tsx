import { Link } from "react-router-dom";
import { ShortLiveInterface } from "../../interfaces/roomDataInterface";

export default function LivePanel({ title, distributor, peopleNum, roomId }: ShortLiveInterface): JSX.Element {
    return (
        <Link to={`/room/listener/${roomId.toString()}`}>
            <div className="min-w-[300px] min-h-[300px]">
                <img src="https://via.placeholder.com/250" alt="live" className="w-full" />
                <h2 className="text-xl">{title}</h2>
                <div className="flex justify-between">
                    <p><span className="text-sm text-gray-600">配信者 </span>{distributor}</p>
                    <p><span className="text-sm text-gray-600">視聴者数 </span>{peopleNum}人</p>
                </div>
            </div>
        </Link>
    )
}