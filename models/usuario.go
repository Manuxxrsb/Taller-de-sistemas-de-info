package models

type Usuario struct {
	Id       int    `gorm:"primaryKey ;autoIncrement"`
	Nombre   string `json:"nombre"`
	Apellido string `json:"apellido"`
}

func (Usuario) TableName() string {
	return "usuario"
}
