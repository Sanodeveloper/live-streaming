package services

import (
	"api/interfaces"
	"api/repositories"
	"crypto/rand"
	"encoding/base64"
)

type AuthServiceInterface interface {
	SignUp(input interfaces.SignUp) (bool, error)
	Login(token string, input interfaces.Login) (bool, string, error)
	Auth(token string) (bool, error)
}

type AuthService struct {
	repository repositories.AuthRepositoryInterface
}

func NewAuthService(repository repositories.AuthRepositoryInterface) AuthServiceInterface {
	return &AuthService{repository: repository}
}

func (s *AuthService) SignUp(input interfaces.SignUp) (bool, error) {
	check, err := s.repository.CheckSignUpUser(input.Name)
	if err != nil {
		return false, err
	}

	if check {
		return true, nil
	}

	createErr := s.repository.CreateUser(input)
	if createErr != nil {
		return false, createErr
	}

	return false, nil

}

func (s *AuthService) Login(token string, input interfaces.Login) (bool, string, error) {
	if token != "" {
		check, checkErr := s.repository.CheckUserFromSession(token)
		if checkErr != nil {
			return false, "", checkErr
		}
		if check {
			return true, token, nil
		}
		return false, "", nil
	}

	check, err := s.repository.CheckLoginUser(input.Name, input.Password)
	if err != nil {
		return false, "", err
	}

	if !check {
		return false, "", nil
	}

	newToken, tokenErr := CreateToken()
	if tokenErr != nil {
		return false, "", tokenErr
	}

	has, hasErr := s.repository.HasSessionInfo(input.Name)

	if hasErr != nil {
		return false, "", hasErr
	}

	if has {
		removeErr := s.repository.RemoveSessionInfo(input.Name)
		if removeErr != nil {
			return false, "", removeErr
		}
	}

	sessionErr := s.repository.SetSessionInfo(newToken, input.Name)
	if sessionErr != nil {
		return false, "", sessionErr
	}

	return true, newToken, nil

}

func CreateToken() (string, error) {
	token := make([]byte, 32)
	_, err := rand.Read(token)
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(token), nil
}

func (s *AuthService) Auth(token string) (bool, error) {
	check, err := s.repository.CheckUserFromSession(token)
	if err != nil {
		return false, err
	}
	return check, nil

}
