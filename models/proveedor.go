package models

import "gorm.io/gorm"

type Proveedor struct {
	gorm.Model
	Nombre       string `json:"nombre"`
	Telefono     string `json:"telefono"`
	Email        string `json:"email"`
	Medicamentos []Medicamento
}

func (Proveedor) TableName() string {
	return "proveedor"
}
