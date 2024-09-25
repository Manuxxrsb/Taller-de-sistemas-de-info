package models

type Categoria struct {
	Id_categoria uint   `json:"Id_categoria" gorm:"primaryKey"`
	Nombre       string `json:"nombre"`
	Descipcion   string `json:"descripcion"`
}

func (Categoria) TableName() string {
	return "categoria"
}
