package interfaces

type Message struct {
	Roomid   uint   `json:"roomId" binding:"required"`
	Username string `json:"name" binding:"required"`
	Message  string `json:"message" binding:"required"`
}

type Room struct {
	Roomid uint `json:"roomId"`
}
