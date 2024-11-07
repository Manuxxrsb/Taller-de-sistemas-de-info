package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ActualizarUsuario(db *gorm.DB) gin.HandlerFunc {
	return func(Request *gin.Context) {
		id := Request.Param("id")
		var Usuario models.Usuario
		if err := db.First(&Usuario, id).Error; err != nil {
			Request.JSON(http.StatusNotFound, gin.H{"error": "Usuario no encontrado " + err.Error()})
			return
		}

		var input models.Usuario
		if err := Request.ShouldBindJSON(&input); err != nil {
			Request.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := db.Model(&Usuario).Updates(input).Error; err != nil {
			Request.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar la Usuario en la BD " + err.Error()})
			return
		}

		Request.JSON(http.StatusOK, Usuario)
	}
}
