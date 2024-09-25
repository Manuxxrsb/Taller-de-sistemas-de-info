package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetLote(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		id := informacion.Param("Id")
		var lote models.Lote
		if err := db.First(&lote, id).Error; err != nil {
			informacion.JSON(http.StatusNotFound, gin.H{"error": "Lote no encontrado"})
			return
		}
		informacion.JSON(http.StatusOK, lote)
	}
}

func GetallLotes(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		var lotes []models.Lote
		err := db.Find(&lotes).Error
		if err != nil {
			informacion.JSON(http.StatusInternalServerError, gin.H{"error": "Error al buscar todos los lotes"})
			return
		}
		informacion.JSON(http.StatusOK, lotes)
	}
}
