package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateMedicamento(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		var medicamento models.Medicamento
		if err := informacion.ShouldBindJSON(&medicamento); err != nil { //verificamos info
			informacion.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := db.Create(&medicamento).Error; err != nil { // creamos la Lote en la bd y controlamos el error
			informacion.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		informacion.JSON(http.StatusOK, medicamento)
	}
}
