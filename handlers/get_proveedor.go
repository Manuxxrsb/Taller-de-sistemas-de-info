package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetProveedor(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		id := informacion.Param("id_categoria")
		var Proveedor models.Proveedor
		if err := db.First(&Proveedor, id).Error; err != nil {
			informacion.JSON(http.StatusNotFound, gin.H{"error": "Proveedor no encontrada"})
			return
		}

		//Asociaciones
		db.Model(&Proveedor).Association("Medicamentos").Find(&Proveedor.Medicamentos)

		informacion.JSON(http.StatusOK, Proveedor)
	}
}

func GetallProveedores(db *gorm.DB) gin.HandlerFunc {
	return func(informacion *gin.Context) {
		var categorias []models.Proveedor
		err := db.Find(&categorias).Error
		if err != nil {
			informacion.JSON(http.StatusInternalServerError, gin.H{"error": "Error al buscar todos los Proveedores"})
			return
		}
		informacion.JSON(http.StatusOK, categorias)
	}
}
