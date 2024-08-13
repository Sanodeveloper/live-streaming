package models

type TalkLog struct {
	Id       uint
	RoomId   uint   `gorm:"column:roomId"`
	UserName string `gorm:"column:userName"`
	Comment  string
}
