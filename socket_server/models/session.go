package models

type SessionInfo struct {
	Id        uint
	SessionId string `gorm:"column:sessionId"`
	UserName  string `gorm:"column:name"`
}
