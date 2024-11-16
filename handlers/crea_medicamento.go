package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateMedicamento(db *gorm.DB) gin.HandlerFunc {
	return func(Request *gin.Context) {
		var medicamento models.Medicamento
		if err := Request.ShouldBindJSON(&medicamento); err != nil {
			Request.JSON(http.StatusBadRequest, gin.H{"Respuesta": "Error al recibir la información " + err.Error()})
			return
		}
		if medicamento.CategoriaID == 0 {
			Request.JSON(http.StatusBadRequest, gin.H{"Mensaje": "ID de categoría no puede ser cero"})
			return
		}
		if medicamento.ProveedorID == 0 {
			Request.JSON(http.StatusBadRequest, gin.H{"Mensaje": "ID de proveedor no puede ser cero"})
			return
		}
		// Verificar si la categoría y el proveedor existen
		var categoria models.Categoria
		if err := db.First(&categoria, medicamento.CategoriaID).Error; err != nil {
			Request.JSON(http.StatusBadRequest, gin.H{"Mensaje": "Categoría no encontrada"})
			return
		}
		var proveedor models.Proveedor
		if err := db.First(&proveedor, medicamento.ProveedorID).Error; err != nil {
			Request.JSON(http.StatusBadRequest, gin.H{"Mensaje": "Proveedor no encontrado"})
			return
		}
		if err := db.Create(&medicamento).Error; err != nil {
			Request.JSON(http.StatusInternalServerError, gin.H{"Mensaje": "Error al crear Medicamento " + err.Error()})
			return
		}
		// Agregar el medicamento a la categoría
		db.Model(&categoria).Association("Medicamentos").Append(&medicamento)
		Request.JSON(http.StatusOK, medicamento)
	}
}
