package models

type Usuario struct {
	Id       int    `json:"Id" gorm:"primaryKey"`
	Nombre   string `json:"nombre"`
	Apellido string `json:"apellido"`
}

func (Usuario) TableName() string {
	return "usuario"
}
