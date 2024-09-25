package main

import (
	config "backend/configs"
	"backend/handlers"
	"backend/models"
	"backend/utils"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {

	fmt.Println("Hola mundo")

	// Conectar a la base de datos
	db, err := utils.OpenGormDB() //abro la conexion a la base de datos
	if err != nil {
		log.Fatalf("Error al conectarse a la BD: %v", err)
	}

	fmt.Print(config.DBURL())

	db.AutoMigrate(&models.Categoria{}, &models.Usuario{}, &models.Lote{}, &models.Medicamento{})

	fmt.Printf("db: %v\n", db) // compruebo de que este funcionando todo hasta aqui

	//creamos el router
	router := gin.Default()

	//configuracion de rutas
	//POST
	router.POST("/categoria", handlers.CreateCategoria(db))
	router.POST("/lote", handlers.CreateLote(db))
	router.POST("/medica", handlers.CreateMedicamento(db))
	router.POST("/usuario", handlers.CreateUsuario(db))

	router.Run(":8080")

}
