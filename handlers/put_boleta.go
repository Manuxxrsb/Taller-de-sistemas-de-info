package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ActualizarBoleta(db *gorm.DB) gin.HandlerFunc {
	return func(Request *gin.Context) {
		id := Request.Param("id")
		var Boleta models.Boleta
		if err := db.First(&Boleta, id).Error; err != nil {
			Request.JSON(http.StatusNotFound, gin.H{"error": "Boleta no encontrado " + err.Error()})
			return
		}

		var input models.Boleta
		if err := Request.ShouldBindJSON(&input); err != nil {
			Request.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := db.Model(&Boleta).Updates(input).Error; err != nil {
			Request.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar la Boleta en la BD " + err.Error()})
			return
		}

		Request.JSON(http.StatusOK, Boleta)
	}
}
