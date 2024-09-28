package main

import (
	config "backend/configs"
	"backend/handlers"
	"backend/models"
	"backend/utils"
	"fmt"
	"log"
	"time"

	"github.com/gin-contrib/cors"
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

	//coors MIDLEWARE DE GIN
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	//rutas de front
	//------------------------------------------------------------------------------
	router.Static("/templates", "./templates")                //sirvo http://localhost:8080/templates/login.html     <-- modificar este
	router.StaticFile("templates2", "./templates/login.html") //sirvo http://localhost:8080/templates2     <-- este pasa sinn el css

	//------------------------------------------------------------------------------
	//rutas de back

	//configuracion de rutas
	//POST
	router.POST("/categoria", handlers.CreateCategoria(db))
	router.POST("/lote", handlers.CreateLote(db))
	router.POST("/medica", handlers.CreateMedicamento(db))
	router.POST("/usuario", handlers.CreateUsuario(db))

	//gets          agregar el preload a las tablas cuando se agreguen las fk
	router.GET("/categoria/:id_categoria", handlers.GetCategoria(db))
	router.GET("/categorias", handlers.GetallCategoria(db))
	router.GET("/lote/:Id", handlers.GetLote(db))
	router.GET("/lotes", handlers.GetallLotes(db))
	router.GET("/medicamento/:Id", handlers.GetMedicamento(db))
	router.GET("/medicamentos", handlers.GetallMedicamentos(db))
	router.GET("/usuario/:Id", handlers.GetUsuario(db))
	router.GET("/usuarios", handlers.GetallUsuarios(db))

	//exponemos el puerto
	router.Run(":8080")

}
