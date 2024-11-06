package models

import "gorm.io/gorm"

type Boleta struct {
	gorm.Model
	Email       string `json:"email"`
	Medicamento []Medicamento
}

func (Boleta) TableName() string {
	return "boleta"
}
