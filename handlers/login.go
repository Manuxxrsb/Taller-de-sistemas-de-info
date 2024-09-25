package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func LoginHandler(c *gin.Context) {
	var creds Credentials
	err := json.NewDecoder(c.Request.Body).Decode(&creds)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Aquí debes agregar la lógica para verificar las credenciales del usuario
	// Por ejemplo, puedes consultar una base de datos o un servicio de autenticación
	if creds.Username == "admin" && creds.Password == "admin" {
		c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
		return
	}

	c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
}
