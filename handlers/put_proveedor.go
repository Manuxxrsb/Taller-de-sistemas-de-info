package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ActualizarProveedor(db *gorm.DB) gin.HandlerFunc {
	return func(Request *gin.Context) {
		id := Request.Param("id")
		var Proveedor models.Proveedor
		if err := db.First(&Proveedor, id).Error; err != nil {
			Request.JSON(http.StatusNotFound, gin.H{"error": "Proveedor no encontrado " + err.Error()})
			return
		}

		var input models.Proveedor
		if err := Request.ShouldBindJSON(&input); err != nil {
			Request.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := db.Model(&Proveedor).Updates(input).Error; err != nil {
			Request.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar la Proveedor en la BD " + err.Error()})
			return
		}

		Request.JSON(http.StatusOK, Proveedor)
	}
}
