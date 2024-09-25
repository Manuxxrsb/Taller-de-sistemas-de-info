package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateUsuario(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		var usuario models.Usuario
		if err := informacion.ShouldBindJSON(&usuario); err != nil { //verificamos info
			informacion.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := db.Create(&usuario).Error; err != nil { // creamos la Usuario en la bd y controlamos el error
			informacion.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		informacion.JSON(http.StatusOK, usuario)
	}
}
