package models

import "gorm.io/gorm"

type Boleta struct {
	gorm.Model
	IdUsuario     string `json:"id_usuario"`
	IdMedicamento string `json:"id_medicamento"`
	Cantidad      string `json:"cantidad"`
}

func (Boleta) TableName() string {
	return "boleta"
}
