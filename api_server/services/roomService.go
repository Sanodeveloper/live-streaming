package services

import (
	"api/interfaces"
	"api/models"
	"api/repositories"
	"time"
)

type RoomServiceInterface interface {
	CreateRoom(roomInfo interfaces.MakeRoomInterface, token string) (uint, error)
	GetRoomForHost(roomId uint, token string) (*models.Room, *models.RoomState, error)
	GetRoomForListener(roomId uint) (*models.Room, error)
	GetTalkLog(roomId uint) ([]interfaces.TalkLogInterface, error)
	DeleteRoom(roomId uint) error
	GetAllTags() ([]string, error)
	SearchRoom(tags []string, keywords []string) ([]models.Room, error)
}

type RoomService struct {
	repository repositories.RoomRepositoryInterface
}

func NewRoomService(repository repositories.RoomRepositoryInterface) RoomServiceInterface {
	return &RoomService{repository: repository}
}

func (s *RoomService) CreateRoom(roomInfo interfaces.MakeRoomInterface, token string) (uint, error) {

	name, err := s.repository.GetNameFromSession(token)
	if err != nil {
		return 0, err
	}

	room := models.Room{
		RoomId:      GenerateRandomNumber(),
		Title:       roomInfo.Title,
		Distributor: name,
		PeopleNum:   0,
		Info:        roomInfo.Info,
	}

	state := models.RoomState{
		RoomId:        room.RoomId,
		CamOn:         roomInfo.RoomState.CamOn,
		MicOn:         roomInfo.RoomState.MicOn,
		ScreenShareOn: roomInfo.RoomState.ScreenShareOn,
	}

	for _, tag := range roomInfo.Tags {
		tagErr := s.repository.AddTag(room.RoomId, tag)
		if tagErr != nil {
			return 0, tagErr
		}
	}
	createErr := s.repository.CreateRoom(room)
	if createErr != nil {
		return 0, createErr
	}

	stateErr := s.repository.CreateState(state)
	return room.RoomId, stateErr
}

func GenerateRandomNumber() uint {
	random := time.Now().UnixMilli()
	return uint(random)
}

func (s *RoomService) GetRoomForHost(roomId uint, token string) (*models.Room, *models.RoomState, error) {
	name, err := s.repository.GetNameFromSession(token)
	if err != nil {
		return nil, nil, err
	}

	room, roomErr := s.repository.GetRoomForHost(roomId, name)
	if roomErr != nil {
		return nil, nil, roomErr
	}

	state, stateErr := s.repository.GetRoomState(roomId)
	return room, state, stateErr
}

func (s *RoomService) GetRoomForListener(roomId uint) (*models.Room, error) {
	room, err := s.repository.GetRoomForListener(roomId)
	if err != nil {
		return nil, err
	}
	return room, err
}

func (s *RoomService) GetTalkLog(roomId uint) ([]interfaces.TalkLogInterface, error) {
	talkLogs, err := s.repository.GetTalkLog(roomId)
	if err != nil {
		return nil, err
	}

	var comments []interfaces.TalkLogInterface
	for _, talkLog := range talkLogs {
		comment := interfaces.TalkLogInterface{
			UserName: talkLog.UserName,
			Comment:  talkLog.Comment,
		}
		comments = append(comments, comment)
	}

	return comments, nil
}

func (s *RoomService) DeleteRoom(roomId uint) error {
	err := s.repository.DeleteTalkLog(roomId)
	if err != nil {
		return err
	}

	err = s.repository.DeleteTag(roomId)
	if err != nil {
		return err
	}

	err = s.repository.DeleteRoom(roomId)
	return err
}

func (s *RoomService) GetAllTags() ([]string, error) {
	return s.repository.GetAllTags()
}

func (s *RoomService) SearchRoom(tags []string, keywords []string) ([]models.Room, error) {
	roomIdList, err := s.repository.GetRoomIdFromTags(tags)
	if err != nil {
		return nil, err
	}
	rooms, roomErr := s.repository.GetRoomFromKeywords(keywords, roomIdList)
	if roomErr != nil {
		return nil, roomErr
	}
	return rooms, nil
}
