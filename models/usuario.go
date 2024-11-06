package models

import "gorm.io/gorm"

type Usuario struct {
	gorm.Model
	Nombre     string `json:"nombre"`
	Apellido   string `json:"apellido"`
	Contrasena string `json:"contrasena"`
	Email      string `json:"email"`
}

func (Usuario) TableName() string {
	return "usuario"
}
