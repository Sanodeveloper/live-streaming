package repositories

import (
	"api/interfaces"
	"api/models"

	"gorm.io/gorm"
)

type AuthRepositoryInterface interface {
	CreateUser(userInfo interfaces.SignUp) error
	CheckSignUpUser(name string) (bool, error)
	CheckLoginUser(name string, password string) (bool, error)
	CheckUserFromSession(token string) (bool, error)
	SetSessionInfo(token string, name string) error
	HasSessionInfo(name string) (bool, error)
	RemoveSessionInfo(name string) error
}

type AuthRepository struct {
	db *gorm.DB
}

func NewAuthRepository(db *gorm.DB) AuthRepositoryInterface {
	return &AuthRepository{db: db}
}

func (r *AuthRepository) CreateUser(userInfo interfaces.SignUp) error {
	results := r.db.Table("users").Create(&userInfo)
	if results.Error != nil {
		return results.Error
	}
	return nil
}

func (r *AuthRepository) CheckSignUpUser(name string) (bool, error) {
	results := r.db.Table("users").Where("name = ?", name).First(&models.User{})
	if results.Error != nil {
		if results.Error.Error() == "record not found" {
			return false, nil
		}
		return false, results.Error
	}
	return true, nil
}

func (r *AuthRepository) CheckLoginUser(name string, password string) (bool, error) {
	results := r.db.Table("users").Where("name = ? AND password = ?", name, password).First(&models.User{})
	if results.Error != nil {
		if results.Error.Error() == "record not found" {
			return false, nil
		}
		return false, results.Error
	}
	return true, nil
}

func (r *AuthRepository) CheckUserFromSession(token string) (bool, error) {
	results := r.db.Table("sessionInfo").Where("sessionId = ?", token).First(&models.SessionInfo{})
	if results.Error != nil {
		if results.Error.Error() == "record not found" {
			return false, nil
		}
		return false, results.Error
	}
	return true, nil
}

func (r *AuthRepository) SetSessionInfo(token string, name string) error {
	results := r.db.Table("sessionInfo").Create(&models.SessionInfo{SessionId: token, UserName: name})
	if results.Error != nil {
		return results.Error
	}
	return nil
}

func (r *AuthRepository) HasSessionInfo(name string) (bool, error) {
	results := r.db.Table("sessionInfo").Where("name = ?", name).First(&models.SessionInfo{})
	if results.Error != nil {
		if results.Error.Error() == "record not found" {
			return false, nil
		}
		return false, results.Error
	}
	return true, nil
}

func (r *AuthRepository) RemoveSessionInfo(name string) error {
	results := r.db.Table("sessionInfo").Where("name = ?", name).Delete(&models.SessionInfo{})
	if results.Error != nil {
		return results.Error
	}
	return nil
}
