package models

import "gorm.io/gorm"

type Proveedor struct {
	gorm.Model
	Rut          string `json:"rut"`
	Nombre       string `json:"nombre"`
	Telefono     string `json:"telefono"`
	Email        string `json:"email"`
	Direccion    string `json:"direccion"`
	Medicamentos []Medicamento
}

func (Proveedor) TableName() string {
	return "proveedor"
}
