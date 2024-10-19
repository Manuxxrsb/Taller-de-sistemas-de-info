package models

type Categoria struct {
	Id_categoria int           `gorm:"primaryKey;autoIncrement"`
	Nombre       string        `json:"nombre"`
	Descripcion  string        `json:"descripcion"`
	Medicamentos []Medicamento `gorm:"foreignKey:CategoriaID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

func (Categoria) TableName() string {
	return "categorias"
}
