package models

import "gorm.io/gorm"

type Categoria struct {
	gorm.Model
	Nombre       string `json:"nombre"`
	Descripcion  string `json:"descripcion"`
	Medicamentos []Medicamento
}

func (Categoria) TableName() string {
	return "categorias"
}
