package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateLote(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		var Lote models.Lote
		if err := informacion.ShouldBindJSON(&Lote); err != nil { //verificamos info
			informacion.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := db.Create(&Lote).Error; err != nil { // creamos la Lote en la bd y controlamos el error
			informacion.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		informacion.JSON(http.StatusOK, Lote)
	}
}
