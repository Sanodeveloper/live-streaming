package services

import (
	repositores "socket/repositories"
)

type IRoomService interface {
	DecrementMember(roomid uint) (uint, error)
	IncrementMember(roomid uint) (uint, error)
	AddTalkLog(roomid uint, message string, name string) error
}

type RoomService struct {
	repository repositores.IRoomRepository
}

func NewRoomService(repository repositores.IRoomRepository) IRoomService {
	return &RoomService{repository: repository}
}

func (s *RoomService) DecrementMember(roomid uint) (uint, error) {
	room, err := s.repository.GetRoomInfo(roomid)
	if err != nil {
		return 0, err
	}
	room.PeopleNum--
	return room.PeopleNum, s.repository.UpdateMember(room)
}

func (s *RoomService) IncrementMember(roomid uint) (uint, error) {
	room, err := s.repository.GetRoomInfo(roomid)
	if err != nil {
		return 0, err
	}
	room.PeopleNum++
	return room.PeopleNum, s.repository.UpdateMember(room)
}

func (s *RoomService) AddTalkLog(roomid uint, message string, name string) error {
	return s.repository.AddTalkLog(roomid, message, name)
}
