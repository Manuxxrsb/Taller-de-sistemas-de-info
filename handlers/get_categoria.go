package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetCategoria(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		id := informacion.Param("id")
		var categoria models.Categoria
		if err := db.Preload("usuario").First(&categoria, id).Error; err != nil {
			informacion.JSON(http.StatusNotFound, gin.H{"error": "Categoria no encontrada"})
			return
		}
		informacion.JSON(http.StatusOK, categoria)
	}
}
