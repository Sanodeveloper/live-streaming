package main

import (
	"api/controllers"
	dbconnection "api/dbConnection"
	"api/middleware"
	"api/repositories"
	"api/services"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		fmt.Println(err.Error())
	}

	db := dbconnection.SetupDB()

	authRepository := repositories.NewAuthRepository(db)
	authService := services.NewAuthService(authRepository)
	authController := controllers.NewAuthController(authService)

	roomRepository := repositories.NewRoomRepository(db)
	roomService := services.NewRoomService(roomRepository)
	roomController := controllers.NewRoomController(roomService)

	router := gin.Default()
	router.Use(middleware.CORSMiddleware("http://localhost:5173"))
	r := router.Group("/api")
	r.POST("/signup", authController.SignUp)
	r.POST("/login", authController.Login)
	r.GET("/auth", authController.Auth)

	r.POST("/room/create", middleware.AuthMiddleware(), roomController.CreateRoom)
	r.GET("/room/host/:roomId", middleware.AuthMiddleware(), roomController.GetRoomForHost)
	r.GET("/room/listener/:roomId", roomController.GetRoomForListener)
	r.DELETE("/room/delete/:roomId", roomController.DeleteRoom)
	r.GET("/room/comments/:roomId", roomController.GetTalkLog)

	r.GET("/tags", roomController.GetAllTags)
	r.GET("/search", roomController.SearchRoom)

	router.Run(":8080") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
