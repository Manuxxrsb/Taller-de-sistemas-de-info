package models

type Boleta struct {
	Id          int           `gorm:"primaryKey ;autoIncrement"`
	Email       string        `json:"email"`
	Medicamento []Medicamento `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

func (Boleta) TableName() string {
	return "Boleta"
}
