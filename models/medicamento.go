package models

type Medicamento struct {
	Id             int    `gorm:"primaryKey;autoIncrement"`
	Nombre         string `json:"nombre"`
	Marca          string `json:"marca"`
	Descripcion    string `json:"descripcion"`
	Numerolote     string `json:"numerolote"`
	Fechafabric    string `json:"fechafabric"`
	Fechavence     string `json:"fechavence"`
	Bioequivalente string `json:"bioequivalente"` //Bioequivalentes logica
	Precio         string `json:"precio"`
	Stock          string `json:"stock"`
	CategoriaID    int    `gorm:"index"` // Clave foránea
}

func (Medicamento) TableName() string {
	return "medicamentos"
}
