package repositories

import (
	"socket/models"

	"gorm.io/gorm"
)

type IRoomRepository interface {
	GetRoomInfo(roomid uint) (models.Room, error)
	UpdateMember(room models.Room) error
	AddTalkLog(roomid uint, message string, name string) error
}

type RoomRepository struct {
	db *gorm.DB
}

func NewRoomRepository(db *gorm.DB) IRoomRepository {
	return &RoomRepository{db: db}
}

func (r *RoomRepository) GetRoomInfo(roomid uint) (models.Room, error) {
	var room models.Room
	results := r.db.Table("rooms").Where("roomId = ?", roomid).First(&room)
	if results.Error != nil {
		return room, results.Error
	}
	return room, nil
}

func (r *RoomRepository) UpdateMember(room models.Room) error {
	results := r.db.Table("rooms").Where("roomId = ?", room.RoomId).Updates(&room)
	if results.Error != nil {
		return results.Error
	}
	return nil
}

func (r *RoomRepository) AddTalkLog(roomid uint, message string, name string) error {
	resutls := r.db.Table("talkLogs").Create(&models.TalkLog{RoomId: roomid, Comment: message, UserName: name})
	if resutls.Error != nil {
		return resutls.Error
	}
	return nil
}
