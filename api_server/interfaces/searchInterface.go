package interfaces

type TagsInterface struct {
	Tags []string `json:"tags" binding:"required"`
}
