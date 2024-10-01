package controllers

import (
	"api/interfaces"
	"api/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthControllerInterface interface {
	SignUp(ctx *gin.Context)
	Login(ctx *gin.Context)
	Auth(ctx *gin.Context)
}

type AuthController struct {
	service services.AuthServiceInterface
}

func NewAuthController(service services.AuthServiceInterface) AuthControllerInterface {
	return &AuthController{service: service}
}

func (c *AuthController) SignUp(ctx *gin.Context) {
	var input interfaces.SignUp
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "server error"})
		return
	}
	isExist, signErr := c.service.SignUp(input)
	if signErr != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "server error"})
		return
	}

	if isExist {
		ctx.JSON(http.StatusConflict, gin.H{"error": "user already exists"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "user created"})

}

func (c *AuthController) Login(ctx *gin.Context) {
	var input interfaces.Login
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "server error"})
		return
	}

	token, _ := ctx.Cookie("sessionId")

	isExist, token, err := c.service.Login(token, input)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "server error"})
		return
	}

	if !isExist {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	ctx.SetCookie("sessionId", token, 60*60, "/", "localhost", false, true)
	ctx.JSON(http.StatusOK, gin.H{"message": "logged in"})
}

func (c *AuthController) Auth(ctx *gin.Context) {
	token, err := ctx.Cookie("sessionId")
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"isAuth": false})
		return
	}

	isExist, checkErr := c.service.Auth(token)
	if checkErr != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "server error"})
		return
	}

	if !isExist {
		ctx.JSON(http.StatusUnauthorized, gin.H{"isAuth": false})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"isAuth": true})
}
