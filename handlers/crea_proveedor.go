package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateProveedor(db *gorm.DB) gin.HandlerFunc {
	return func(Request *gin.Context) {
		var Proveedor models.Proveedor
		if err := Request.ShouldBindJSON(&Proveedor); err != nil {
			Request.JSON(http.StatusBadRequest, gin.H{"Respuesta": "Error al recibir la información " + err.Error()})
			return
		}
		if err := db.Create(&Proveedor).Error; err != nil {
			Request.JSON(http.StatusInternalServerError, gin.H{"Mensaje": "Error al crear Proveedor " + err.Error()})
			return
		}
		Request.JSON(http.StatusOK, Proveedor)
	}
}
