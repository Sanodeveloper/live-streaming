package repositories

import (
	"api/models"
	"fmt"

	"gorm.io/gorm"
)

type RoomRepositoryInterface interface {
	CreateRoom(roomInfo models.Room) error
	CreateState(state models.RoomState) error
	GetRoomForHost(roomId uint, name string) (*models.Room, error)
	GetRoomState(roomId uint) (*models.RoomState, error)
	GetRoomForListener(roomId uint) (*models.Room, error)
	GetTalkLog(roomId uint) ([]models.TalkLog, error)
	DeleteRoom(roomId uint) error
	DeleteTalkLog(roomId uint) error
	DeleteTag(roomId uint) error
	DeleteRoomState(roomId uint) error
	UpdatePeopleNum(roomId uint, people uint) error
	GetNameFromSession(token string) (string, error)
	GetAllTags() ([]string, error)
	AddTag(roomId uint, tag string) error
	GetRoomIdFromTags(tags []string) ([]uint, error)
	GetRoomFromKeywords(keywords []string, roomIdList []uint) ([]models.Room, error)
}

type RoomRepository struct {
	db *gorm.DB
}

func NewRoomRepository(db *gorm.DB) RoomRepositoryInterface {
	return &RoomRepository{db: db}
}

func (r *RoomRepository) CreateRoom(roomInfo models.Room) error {
	results := r.db.Table("rooms").Create(&roomInfo)
	if results.Error != nil {
		return results.Error
	}
	return nil
}

func (r *RoomRepository) CreateState(state models.RoomState) error {
	results := r.db.Table("roomStates").Create(&state)
	if results.Error != nil {
		return results.Error
	}
	return nil
}

func (r *RoomRepository) GetNameFromSession(token string) (string, error) {
	var sessionInfo models.SessionInfo
	results := r.db.Table("sessionInfo").Where("sessionId = ?", token).Select("name").First(&sessionInfo)
	if results.Error != nil {
		return "", results.Error
	}
	return sessionInfo.UserName, nil
}

func (r *RoomRepository) GetRoomForHost(roomId uint, name string) (*models.Room, error) {
	room := models.Room{}
	results := r.db.Table("rooms").Where("roomId = ? AND distributor = ?", roomId, name).First(&room)
	if results.Error != nil {
		return nil, results.Error
	}
	return &room, nil
}

func (r *RoomRepository) GetRoomState(roomId uint) (*models.RoomState, error) {
	state := models.RoomState{}
	results := r.db.Table("roomStates").Where("roomId = ?", roomId).First(&state)
	if results.Error != nil {
		return nil, results.Error
	}
	return &state, nil
}

func (r *RoomRepository) GetRoomForListener(roomId uint) (*models.Room, error) {
	room := models.Room{}
	results := r.db.Table("rooms").Where("roomId = ?", roomId).First(&room)
	if results.Error != nil {
		return nil, results.Error
	}
	return &room, nil
}

func (r *RoomRepository) GetTalkLog(roomId uint) ([]models.TalkLog, error) {
	var talkLogs []models.TalkLog
	subQuery := r.db.Table("talkLogs").Where("roomId = ?", roomId).Order("id desc").Limit(50)
	results := r.db.Table("talkLogs").Table("(?) as u", subQuery).Order("id asc").Find(&talkLogs)
	if results.Error != nil {
		return nil, results.Error
	}
	return talkLogs, nil
}

func (r *RoomRepository) DeleteRoom(roomId uint) error {
	results := r.db.Table("rooms").Where("roomId = ?", roomId).Delete(&models.Room{})
	if results.Error != nil {
		return results.Error
	}
	return nil
}

func (r *RoomRepository) DeleteTalkLog(roomId uint) error {
	results := r.db.Table("talkLogs").Where("roomId = ?", roomId).Delete(&models.TalkLog{})
	if results.Error != nil {
		return results.Error
	}
	return nil
}

func (r *RoomRepository) DeleteTag(roomId uint) error {
	results := r.db.Table("tags").Where("roomId = ?", roomId).Delete(&models.Tags{})
	if results.Error != nil {
		return results.Error
	}
	return nil
}

func (r *RoomRepository) DeleteRoomState(roomId uint) error {
	results := r.db.Table("roomStates").Where("roomId = ?", roomId).Delete(&models.RoomState{})
	if results.Error != nil {
		return results.Error
	}
	return nil
}

func (r *RoomRepository) UpdatePeopleNum(roomId uint, people uint) error {
	results := r.db.Table("rooms").Where("roomId = ?", roomId).Update("peopleNum", people)
	if results.Error != nil {
		return results.Error
	}
	return nil
}

func (r *RoomRepository) GetAllTags() ([]string, error) {
	var tagList []models.Tags
	results := r.db.Table("tags").Select("tag").Find(&tagList)
	if results.Error != nil {
		return nil, results.Error
	}
	tags := []string{}
	for _, tag := range tagList {
		tags = append(tags, tag.Tag)
	}

	//重複削除
	var set = []string{}
	add := func(value string) {
		for _, v := range set {
			if v == value {
				return // 重複があれば追加しない
			}
		}
		set = append(set, value)
	}

	for _, tag := range tags {
		add(tag)
	}

	return set, nil
}

func (r *RoomRepository) GetRoomIdFromTags(tags []string) ([]uint, error) {
	var tagList []models.Tags
	if len(tags) == 0 {
		results := r.db.Table("tags").Select("roomId").Find(&tagList)
		if results.Error != nil {
			return nil, results.Error
		}
	} else {
		results := r.db.Table("tags").Where("tag IN (?)", tags).Select("roomId").Find(&tagList)
		if results.Error != nil {
			return nil, results.Error
		}
	}

	roomIdList := []uint{}
	for _, tag := range tagList {
		roomIdList = append(roomIdList, tag.RoomId)
	}

	//重複削除
	var set = []uint{}
	add := func(value uint) {
		for _, v := range set {
			if v == value {
				return // 重複があれば追加しない
			}
		}
		set = append(set, value)
	}

	for _, id := range roomIdList {
		add(id)
	}

	return set, nil
}

func (r *RoomRepository) AddTag(roomId uint, tag string) error {
	results := r.db.Table("tags").Create(&models.Tags{RoomId: roomId, Tag: tag})
	if results.Error != nil {
		return results.Error
	}
	return nil
}

func (r *RoomRepository) GetRoomFromKeywords(keywords []string, roomIdList []uint) ([]models.Room, error) {
	var rooms []models.Room
	if len(keywords) == 0 {
		results := r.db.Table("rooms").Where("roomId IN (?)", roomIdList).Find(&rooms)
		if results.Error != nil {
			return nil, results.Error
		}
	} else {
		for _, keyword := range keywords {
			fmt.Printf("keyword: %s\n", keyword)
			var roomList []models.Room
			results := r.db.Table("rooms").Where("roomId IN (?) AND title LIKE ?", roomIdList, "%"+keyword+"%").Find(&roomList)
			if results.Error != nil {
				return nil, results.Error
			}
			rooms = append(rooms, roomList...)
		}
	}

	return rooms, nil
}
