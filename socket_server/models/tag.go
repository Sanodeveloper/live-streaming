package models

type Tags struct {
	Id     uint
	RoomId uint `gorm:"column:roomId"`
	Tag    string
}
