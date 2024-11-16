package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ActualizarCategoria(db *gorm.DB) gin.HandlerFunc {
	return func(Request *gin.Context) {
		id := Request.Param("id")
		var Categoria models.Categoria
		if err := db.First(&Categoria, id).Error; err != nil {
			Request.JSON(http.StatusNotFound, gin.H{"error": "Categoria no encontrado"})
			return
		}

		var input models.Categoria
		if err := Request.ShouldBindJSON(&input); err != nil {
			Request.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := db.Model(&Categoria).Updates(input).Error; err != nil {
			Request.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar el Categoria en la BD " + err.Error()})
			return
		}

		Request.JSON(http.StatusOK, Categoria)
	}
}