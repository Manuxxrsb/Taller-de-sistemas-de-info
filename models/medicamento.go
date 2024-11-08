package models

import "gorm.io/gorm"

type Medicamento struct {
	gorm.Model
	Nombre         string `json:"nombre"`
	Marca          string `json:"marca"`
	Descripcion    string `json:"descripcion"`
	Numerolote     string `json:"numerolote"`
	Fechafabric    string `json:"fechafabric"`
	Fechavence     string `json:"fechavence"`
	Bioequivalente string `json:"bioequivalente"`
	Precio         string `json:"precio"`
	Stock          string `json:"stock"`
	CategoriaID    int
	ProveedorID    int
}

func (Medicamento) TableName() string {
	return "medicamentos"
}
