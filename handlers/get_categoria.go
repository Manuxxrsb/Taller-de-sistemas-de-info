package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetCategoria(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		id := informacion.Param("id_categoria")
		var categoria models.Categoria
		if err := db.First(&categoria, id).Error; err != nil {
			informacion.JSON(http.StatusNotFound, gin.H{"error": "Categoria no encontrada"})
			return
		}

		//Asociaciones
		db.Model(&categoria).Association("Medicamentos").Find(&categoria.Medicamentos)

		informacion.JSON(http.StatusOK, categoria)
	}
}

func GetallCategoria(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		var categorias []models.Categoria
		err := db.Find(&categorias).Error
		if err != nil {
			informacion.JSON(http.StatusInternalServerError, gin.H{"error": "Error al buscar todas las categorías"})
			return
		}
		informacion.JSON(http.StatusOK, categorias)
	}
}
