package models

type Categoria struct {
	Id_categoria int    `gorm:"primaryKey ;autoIncrement"`
	Nombre       string `json:"nombre"`
	Descripcion  string `json:"descripcion"`
}

func (Categoria) TableName() string {
	return "categoria"
}
