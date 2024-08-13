export interface LiveInterface {
    roomId: number;
    title: string;
    distributor: string;
    peopleNum: number;
    info: string;
}

export interface RoomStateInterface {
    camOn: boolean;
    micOn: boolean;
    screenShareOn: boolean;
}

export interface ShortLiveInterface {
    roomId: number;
    title: string;
    distributor: string;
    peopleNum: number;
}

export interface CommentInterface {
    userName: string;
    comment: string;
}

export interface MakeRoomInterface {
    title: string;
    info: string;
    tags: string[];
    roomState: RoomStateInterface;
}

export interface HostRoomInterface {
    roomId: number;
    title: string;
    distributor: string;
    peopleNum: number;
    info: string;
    roomState: RoomStateInterface;
}