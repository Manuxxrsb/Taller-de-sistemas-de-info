// ActualizarMedicamento es el handler para actualizar un medicamento
package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ActualizarMedicamento(db *gorm.DB) gin.HandlerFunc {
	return func(Request *gin.Context) {
		id := Request.Param("id")
		var medicamento models.Medicamento
		if err := db.First(&medicamento, id).Error; err != nil {
			Request.JSON(http.StatusNotFound, gin.H{"error": "Medicamento no encontrado"})
			return
		}

		var input models.Medicamento
		if err := Request.ShouldBindJSON(&input); err != nil {
			Request.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := db.Model(&medicamento).Updates(input).Error; err != nil {
			Request.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar el Medicamento en la BD " + err.Error()})
			return
		}

		Request.JSON(http.StatusOK, medicamento)
	}
}
