package main

import (
	"backend/routes"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	//creamos el router
	router := gin.Default()

	//coors MIDLEWARE DE GIN
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	//------------------------------------------------------------------------------
	routes.ConfiguraRutas(router)

	//exponemos el puerto
	router.Run(":8080")

}
