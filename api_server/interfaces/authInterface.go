package interfaces

type Login struct {
	Name     string `json:"name" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type SignUp struct {
	Name     string `json:"name" binding:"required"`
	Password string `json:"password" binding:"required"`
	Email    string `json:"email" binding:"required"`
}
