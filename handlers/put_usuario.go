package handlers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ActualizarUsuario(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the user ID from the request body
		var usuario models.Usuario
		if err := c.BindJSON(&usuario); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// Find the user in the database
		var user models.Usuario
		db.First(&user, usuario.Id)
		if user.Id == 0 {
			c.JSON(http.StatusNotFound, gin.H{"error": "Usuario no encontrado"})
			return
		}
		// Update the user in the database
		err := db.Model(&user).Updates(map[string]interface{}{
			"nombre":   usuario.Nombre,
			"apellido": usuario.Apellido,
			"email":    usuario.Email,
		}).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Usuario actualizado con éxito"})
	}
}
