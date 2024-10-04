package models

type Medicamento struct {
	Id          int    `gorm:"primaryKey;autoIncrement"`
	Nombre      string `json:"Nombre"`
	Marca       string `json:"Marca"`
	Descripcion string `json:"Descripcion"`
	Numerolote  string `json:"numerolote"`
	Fechafabric string `json:"fechafabric"`
	Fechavence  string `json:"fechavence"`
	Stock       string `json:"stock"`
}

func (Medicamento) TableName() string {
	return "medicamento"
}
