package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateCategoria(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		var categoria models.Categoria
		if err := informacion.ShouldBindJSON(&categoria); err != nil {
			informacion.JSON(http.StatusBadRequest, gin.H{"Error": err.Error()})
			return
		}

		// Guardar la categoría primero
		if err := db.Create(&categoria).Error; err != nil {
			informacion.JSON(http.StatusInternalServerError, gin.H{"Create": err.Error()})
			return
		}

		informacion.JSON(http.StatusOK, categoria)
	}
}
