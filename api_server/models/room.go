package models

type Room struct {
	RoomId      uint `gorm:"column:roomId"`
	Title       string
	Distributor string
	PeopleNum   uint `gorm:"column:peopleNum"`
	Info        string
}

type RoomState struct {
	RoomId        uint `gorm:"column:roomId"`
	CamOn         bool `gorm:"column:camOn"`
	MicOn         bool `gorm:"column:micOn"`
	ScreenShareOn bool `gorm:"column:screenShareOn"`
}
