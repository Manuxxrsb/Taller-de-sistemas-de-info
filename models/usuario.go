package models

type Usuario struct {
	Id         int    `gorm:"primaryKey ;autoIncrement"`
	Nombre     string `json:"nombre"`
	Apellido   string `json:"apellido"`
	Contrasena string `json:"contrasena"`
	Email      string `json:"email"`
}

func (Usuario) TableName() string {
	return "usuario"
}
