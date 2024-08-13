package interfaces

type LiveInterface struct {
	RoomId      uint   `json:"roomId" binding:"required"`
	Title       string `json:"title" binding:"required"`
	Distributor string `json:"distributor" binding:"required"`
	PeopleNum   uint   `json:"peopleNum" binding:"required"`
	Info        string `json:"info"`
}

type RoomStateInterface struct {
	CamOn         bool `json:"camOn"`
	MicOn         bool `json:"micOn"`
	ScreenShareOn bool `json:"screenShareOn"`
}

type CommentInterface struct {
	UserName string `json:"userName" binding:"required"`
	Comment  string `json:"comment" binding:"required"`
}

type MakeRoomInterface struct {
	Title     string             `json:"title" binding:"required"`
	Info      string             `json:"info"`
	Tags      []string           `json:"tags"`
	RoomState RoomStateInterface `json:"roomState" binding:"required"`
}

type HostRoomInterface struct {
	RoomId      uint               `json:"roomId" binding:"required"`
	Title       string             `json:"title" binding:"required"`
	Distributor string             `json:"distributor" binding:"required"`
	PeopleNum   uint               `json:"peopleNum" binding:"required"`
	Info        string             `json:"info"`
	RoomState   RoomStateInterface `json:"roomState" binding:"required"`
}

type TalkLogInterface struct {
	UserName string `json:"userName" binding:"required"`
	Comment  string `json:"comment" binding:"required"`
}
