package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateBoleta(db *gorm.DB) gin.HandlerFunc {
	return func(Request *gin.Context) {
		var Boleta models.Boleta
		if err := Request.ShouldBindJSON(&Boleta); err != nil {
			Request.JSON(http.StatusBadRequest, gin.H{"Respuesta": "Error al recibir la información " + err.Error()})
			return
		}
		if err := db.Create(&Boleta).Error; err != nil {
			Request.JSON(http.StatusInternalServerError, gin.H{"Mensaje": "Error al crear Boleta " + err.Error()})
			return
		}

		Request.JSON(http.StatusOK, Boleta)
	}
}
