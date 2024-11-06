package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateUsuario(db *gorm.DB) gin.HandlerFunc {
	return func(Request *gin.Context) {
		var usuario models.Usuario
		if err := Request.ShouldBindJSON(&usuario); err != nil {
			Request.JSON(http.StatusBadRequest, gin.H{"Respuesta": "Error al recibir la información " + err.Error()})
			return
		}
		if err := db.Create(&usuario).Error; err != nil {
			Request.JSON(http.StatusInternalServerError, gin.H{"Mensaje": "Error al crear Usuario " + err.Error()})
			return
		}
		Request.JSON(http.StatusOK, usuario)
	}
}
