package controllers

import (
	"api/interfaces"
	"api/services"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type RoomControllerInterface interface {
	CreateRoom(ctx *gin.Context)
	GetRoomForHost(ctx *gin.Context)
	GetRoomForListener(ctx *gin.Context)
	GetTalkLog(ctx *gin.Context)
	DeleteRoom(ctx *gin.Context)
	GetAllTags(ctx *gin.Context)
	SearchRoom(ctx *gin.Context)
}

type RoomController struct {
	service services.RoomServiceInterface
}

func NewRoomController(service services.RoomServiceInterface) RoomControllerInterface {
	return &RoomController{service: service}
}

func (c *RoomController) CreateRoom(ctx *gin.Context) {
	var input interfaces.MakeRoomInterface
	if err := ctx.ShouldBindJSON(&input); err != nil {
		fmt.Println(err.Error())
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "bad request"})
		return
	}

	token, _ := ctx.Cookie("sessionId")

	roomId, err := c.service.CreateRoom(input, token)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "server error"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"roomId": roomId})
}

func (c *RoomController) GetRoomForHost(ctx *gin.Context) {
	roomIdStr := ctx.Param("roomId")
	parsedint64, err := strconv.ParseUint(roomIdStr, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "cannot parse query"})
		return
	}
	roomId := uint(parsedint64)

	token, _ := ctx.Cookie("sessionId")

	room, state, roomErr := c.service.GetRoomForHost(roomId, token)
	if roomErr != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "server error"})
		return
	}

	roomState := interfaces.RoomStateInterface{
		CamOn:         state.CamOn,
		MicOn:         state.MicOn,
		ScreenShareOn: state.ScreenShareOn,
	}

	hostRoom := interfaces.HostRoomInterface{
		RoomId:      room.RoomId,
		Title:       room.Title,
		Distributor: room.Distributor,
		PeopleNum:   room.PeopleNum,
		Info:        room.Info,
		RoomState:   roomState,
	}

	ctx.JSON(http.StatusOK, hostRoom)
}

func (c *RoomController) GetRoomForListener(ctx *gin.Context) {
	roomIdStr := ctx.Param("roomId")
	parsedint64, err := strconv.ParseUint(roomIdStr, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "cannot parse query"})
		return
	}
	roomId := uint(parsedint64)

	room, roomErr := c.service.GetRoomForListener(roomId)
	if roomErr != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "server error"})
		return
	}

	listenerRoom := interfaces.LiveInterface{
		RoomId:      room.RoomId,
		Title:       room.Title,
		Distributor: room.Distributor,
		PeopleNum:   room.PeopleNum,
		Info:        room.Info,
	}

	ctx.JSON(http.StatusOK, listenerRoom)

}

func (c *RoomController) GetTalkLog(ctx *gin.Context) {
	roomIdStr := ctx.Param("roomId")
	parsedint64, err := strconv.ParseUint(roomIdStr, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "cannot parse query"})
		return
	}
	roomId := uint(parsedint64)

	comments, err := c.service.GetTalkLog(roomId)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "server error"})
		return
	}

	ctx.JSON(http.StatusOK, comments)
}

func (c *RoomController) DeleteRoom(ctx *gin.Context) {
	roomIdStr := ctx.Param("roomId")
	parsedint64, err := strconv.ParseUint(roomIdStr, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "cannot parse query"})
		return
	}
	roomId := uint(parsedint64)

	roomErr := c.service.DeleteRoom(roomId)
	if roomErr != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "server error"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "room deleted"})
}

func (c *RoomController) GetAllTags(ctx *gin.Context) {
	tags, err := c.service.GetAllTags()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "server error"})
		return
	}
	ctx.JSON(http.StatusOK, interfaces.TagsInterface{Tags: tags})
}

func (c *RoomController) SearchRoom(ctx *gin.Context) {
	tagsStr := ctx.Query("tags")
	keywordsStr := ctx.Query("keywords")

	tags := strings.Fields(tagsStr)
	keywords := strings.Fields(keywordsStr)

	rooms, err := c.service.SearchRoom(tags, keywords)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "server error"})
		return
	}

	liveRooms := []interfaces.LiveInterface{}
	for _, room := range rooms {
		liveRoom := interfaces.LiveInterface{
			RoomId:      room.RoomId,
			Title:       room.Title,
			Distributor: room.Distributor,
			PeopleNum:   room.PeopleNum,
			Info:        room.Info,
		}
		liveRooms = append(liveRooms, liveRoom)
	}

	ctx.JSON(http.StatusOK, liveRooms)
}
