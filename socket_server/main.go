package main

import (
	"encoding/json"
	"fmt"
	"log"
	"socket/controllers"
	dbconnection "socket/dbConnection"
	"socket/interfaces"
	"socket/middlewares"
	"socket/repositories"
	"socket/services"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	socket "github.com/googollee/go-socket.io"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err.Error())
	}

	db := dbconnection.SetupDB()
	repository := repositories.NewRoomRepository(db)
	service := services.NewRoomService(repository)
	controller := controllers.NewRoomController(service)

	server := socket.NewServer(nil)
	server.OnConnect("/", func(s socket.Conn) error {
		s.SetContext("")
		log.Println("Connected:", s.ID())
		return nil
	})

	server.OnEvent("/", "join", func(s socket.Conn, room string) {
		var roomid interfaces.Room
		json.Unmarshal([]byte(room), &roomid)
		s.Join(strconv.Itoa(int(roomid.Roomid)))
		num, _ := controller.IncrementMember(roomid.Roomid)
		server.BroadcastToRoom("/", strconv.Itoa(int(roomid.Roomid)), "join", num)
		fmt.Printf("join room: %d\n", roomid.Roomid)
		fmt.Printf("AllroomMember: %v\n", server.Rooms("/"))
	})

	server.OnEvent("/", "leave", func(s socket.Conn, room string) {
		var roomid interfaces.Room
		json.Unmarshal([]byte(room), &roomid)
		s.Leave(strconv.Itoa(int(roomid.Roomid)))
		num, _ := controller.DecrementMember(roomid.Roomid)
		server.BroadcastToRoom("/", strconv.Itoa(int(roomid.Roomid)), "leave", num)
		fmt.Printf("leave room: %d\n", roomid.Roomid)
		fmt.Printf("AllroomMember: %v\n", server.Rooms("/"))
	})

	server.OnEvent("/", "message", func(s socket.Conn, msg string) {
		var data interfaces.Message
		json.Unmarshal([]byte(msg), &data)
		fmt.Printf("message: %+v\n", data)

		newData := &interfaces.Message{Username: data.Username, Message: data.Message, Roomid: data.Roomid}
		jsonData, _ := json.Marshal(newData)

		controller.AddTalkLog(data.Roomid, data.Message, data.Username)
		server.BroadcastToRoom("/", strconv.Itoa(int(data.Roomid)), "message", string(jsonData))
	})

	server.OnDisconnect("/", func(s socket.Conn, reason string) {
		fmt.Println("closed", reason)
	})

	go func() {
		if err := server.Serve(); err != nil {
			log.Fatalf("socketio listen error: %s\n", err)
		}
	}()
	defer server.Close()

	router := gin.Default()

	router.Use(middlewares.CORSMiddleware("http://localhost:5173"))
	router.GET("/socket.io/*any", gin.WrapH(server))
	router.POST("/socket.io/*any", gin.WrapH(server))

	if err := router.Run(":8000"); err != nil {
		log.Fatal("failed run app: ", err)
	} else {
		log.Println("Server start !!")
	}

}
