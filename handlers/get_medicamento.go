package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetMedicamento(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		id := informacion.Param("Id")
		var medicamento models.Medicamento
		if err := db.First(&medicamento, id).Error; err != nil {
			informacion.JSON(http.StatusNotFound, gin.H{"error": "Medicamento no encontrada"})
			return
		}
		informacion.JSON(http.StatusOK, medicamento)
	}
}

func GetallMedicamentos(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		var medicamentos []models.Medicamento
		err := db.Find(&medicamentos).Error
		if err != nil {
			informacion.JSON(http.StatusInternalServerError, gin.H{"error": "Error al buiscar todos los medicamentos"})
			return
		}
		informacion.JSON(http.StatusOK, medicamentos)
	}
}
