package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateMedicamento(db *gorm.DB) gin.HandlerFunc {
	return func(Request *gin.Context) {
		var medicamento models.Medicamento
		if err := Request.ShouldBindJSON(&medicamento); err != nil {
			Request.JSON(http.StatusBadRequest, gin.H{"Respuesta": "Error al recibir la información " + err.Error()})
			return
		}
		if err := db.Create(&medicamento).Error; err != nil {
			Request.JSON(http.StatusInternalServerError, gin.H{"Mensaje": "Error al crear Medicamento " + err.Error()})
			return
		}
		Request.JSON(http.StatusOK, medicamento)
	}
}
