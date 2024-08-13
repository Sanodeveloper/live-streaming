import LivePanel from "./LivePanel";
import { useAtomValue, useSetAtom } from "jotai";
import { searchLiveInfoAtom, liveInitialDataAtom } from "../../atoms/livePanel";

export default function GridLivePanels(): JSX.Element {
    const liveData = useAtomValue(searchLiveInfoAtom);
    const setInitialData = useSetAtom(liveInitialDataAtom);

    window.onload = () => {
        setInitialData();
    }

    return (
        <>
            {
                liveData.map((live, index) => {
                    return (
                        <LivePanel key={index} title={live.title} distributor={live.distributor} peopleNum={live.peopleNum} roomId={live.roomId} />
                    )
                }
                )
            }
        </>
    )
}