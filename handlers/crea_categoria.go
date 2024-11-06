package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateCategoria(db *gorm.DB) gin.HandlerFunc {
	return func(Request *gin.Context) {
		var categoria models.Categoria
		if err := Request.ShouldBindJSON(&categoria); err != nil {
			Request.JSON(http.StatusBadRequest, gin.H{"Respuesta": "Error al recibir la información " + err.Error()})
			return
		}
		if err := db.Create(&categoria).Error; err != nil {
			Request.JSON(http.StatusInternalServerError, gin.H{"Mensaje": "Error al crear categoria " + err.Error()})
			return
		}

		Request.JSON(http.StatusOK, categoria)
	}
}
