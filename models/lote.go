package models

type Lote struct {
	Id           string        `json:"Id" gorm:"primaryKey"`
	Numerolote   string        `json:"numerolote"`
	Fechafabric  string        `json:"fechafabric"`
	Fechavence   string        `json:"fechavence"`
	Medicamentos []Medicamento `json:"id_medicamentos" gorm:"foreignKey:Id"`
	Stock        string        `json:"stock"`
}

func (Lote) TableName() string {
	return "lote"
}
