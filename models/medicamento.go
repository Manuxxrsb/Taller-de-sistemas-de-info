package models

type Medicamento struct {
	Id          string `json:"Id" gorm:"primaryKey"`
	Nombre      string `json:"nombre"`
	Marca       string `json:"Marca"`
	Descripcion string `json:"descripcion"`
}

func (Medicamento) TableName() string {
	return "medicamento"
}
