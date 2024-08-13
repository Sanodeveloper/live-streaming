import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home/Home";
import SignUpCover from "../components/signUp/SignUpCover";
import LoginCover from "../components/login/LoginCover";
import MakeRoomCover from "../components/makeRoom/MakeRoomCover";
import HostRoomCover from "../components/liveRoom/HostRoomCover";
import ListenerRoomCover from "../components/liveRoom/ListenerRoomCover";

const routes = createBrowserRouter([
    { path: "/", Component: Home },
    { path: "/room/host/:roomId", Component: HostRoomCover },
    { path: "/room/listener/:roomId", Component: ListenerRoomCover },
    { path: "/sign-up", Component: SignUpCover },
    { path: "/login", Component: LoginCover },
    { path: "/room/make-room", Component: MakeRoomCover },
]);

export default routes;