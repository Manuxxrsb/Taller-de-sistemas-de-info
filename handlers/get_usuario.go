package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetUsuario(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		id := informacion.Param("Id")
		var usuario models.Usuario
		if err := db.First(&usuario, id).Error; err != nil {
			informacion.JSON(http.StatusNotFound, gin.H{"error": "Usuario no encontrado"})
			return
		}
		informacion.JSON(http.StatusOK, usuario)
	}
}

func GetallUsuarios(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		var usuarios []models.Usuario
		err := db.Find(&usuarios).Error
		if err != nil {
			informacion.JSON(http.StatusInternalServerError, gin.H{"error": "Error al buscar todos los usuarios"})
			return
		}
		informacion.JSON(http.StatusOK, usuarios)
	}
}
