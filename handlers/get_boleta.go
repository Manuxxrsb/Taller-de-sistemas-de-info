package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetBoleta(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		id := informacion.Param("id_Boleta")
		var Boleta models.Boleta
		if err := db.First(&Boleta, id).Error; err != nil {
			informacion.JSON(http.StatusNotFound, gin.H{"error": "Boleta no encontrada"})
			return
		}

		informacion.JSON(http.StatusOK, Boleta)
	}
}

func GetallBoleta(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		var Boletas []models.Boleta
		err := db.Find(&Boletas).Error
		if err != nil {
			informacion.JSON(http.StatusInternalServerError, gin.H{"error": "Error al buscar todas las boletas"})
			return
		}
		informacion.JSON(http.StatusOK, Boletas)
	}
}
