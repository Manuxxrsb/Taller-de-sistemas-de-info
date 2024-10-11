package routes

import (
	"backend/handlers"
	"backend/models"
	"backend/utils"
	"log"

	"github.com/gin-gonic/gin"
)

func ConfiguraRutas(router *gin.Engine) {

	db, err := utils.OpenGormDB() //abro la conexion a la base de datos
	if err != nil {
		log.Fatalf("Error al conectarse a la BD: %v", err)
	}

	db.AutoMigrate(&models.Categoria{}, &models.Usuario{}, &models.Medicamento{})

	//POST
	router.POST("/categoria", handlers.CreateCategoria(db))
	router.POST("/medica", handlers.CreateMedicamento(db))
	router.POST("/usuario", handlers.CreateUsuario(db))

	//gets          agregar el preload a las tablas cuando se agreguen las fk
	router.GET("/categoria/:id_categoria", handlers.GetCategoria(db))
	router.GET("/categorias", handlers.GetallCategoria(db))
	router.GET("/medicamento/:Id", handlers.GetMedicamento(db))
	router.GET("/medicamentos", handlers.GetallMedicamentos(db))
	router.GET("/usuario/:Id", handlers.GetUsuario(db))
	router.GET("/usuarios", handlers.GetallUsuarios(db))

	//Login
	router.POST("/login")

}
