package controllers

import (
	"socket/services"
)

type IRoomController interface {
	DecrementMember(roomid uint) (uint, error)
	IncrementMember(roomid uint) (uint, error)
	AddTalkLog(roomid uint, message string, name string) error
}

type RoomController struct {
	service services.IRoomService
}

func NewRoomController(service services.IRoomService) IRoomController {
	return &RoomController{service: service}
}

func (c *RoomController) DecrementMember(roomid uint) (uint, error) {
	num, err := c.service.DecrementMember(roomid)
	return num, err
}

func (c *RoomController) IncrementMember(roomid uint) (uint, error) {
	num, err := c.service.IncrementMember(roomid)
	return num, err
}

func (c *RoomController) AddTalkLog(roomid uint, message string, name string) error {
	err := c.service.AddTalkLog(roomid, message, name)
	return err
}
