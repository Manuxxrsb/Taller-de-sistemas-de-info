// ActualizarMedicamento es el handler para actualizar un medicamento
package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ActualizarMedicamento(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var medicamento models.Medicamento
		if err := db.First(&medicamento, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Medicamento no encontrado"})
			return
		}

		var input models.Medicamento
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Actualizar solo los campos proporcionados
		updateData := map[string]interface{}{
			"Nombre":         input.Nombre,
			"Marca":          input.Marca,
			"Descripcion":    input.Descripcion,
			"Numerolote":     input.Numerolote,
			"Fechafabric":    input.Fechafabric,
			"Fechavence":     input.Fechavence,
			"Stock":          input.Stock,
			"Bioequivalente": input.Bioequivalente,
			"Precio":         input.Precio,
		}

		if err := db.Model(&medicamento).Updates(updateData).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar el medicamento"})
			return
		}

		c.JSON(http.StatusOK, medicamento)
	}
}
