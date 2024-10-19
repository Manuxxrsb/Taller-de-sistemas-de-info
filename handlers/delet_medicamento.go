package handlers

import (
	"backend/models" // Cambia esto según la ruta de tu modelo
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func DeleteMedicamento(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id") // Obtener el ID del parámetro de la URL

		// Buscar el medicamento por ID
		var medicamento models.Medicamento
		if err := db.First(&medicamento, id).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(http.StatusNotFound, gin.H{"error": "Medicamento no encontrado"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Eliminar el medicamento
		if err := db.Delete(&medicamento).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Medicamento eliminado con éxito"})
	}
}
