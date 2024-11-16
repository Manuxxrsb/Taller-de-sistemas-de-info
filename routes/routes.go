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

	//migracion de los modelos
	db.AutoMigrate(&models.Usuario{})
	db.AutoMigrate(&models.Categoria{})
	db.AutoMigrate(&models.Medicamento{})
	db.AutoMigrate(&models.Proveedor{})

	//POST
	router.POST("/categoria", handlers.CreateCategoria(db))
	router.POST("/medica", handlers.CreateMedicamento(db))
	router.POST("/usuario", handlers.CreateUsuario(db))
	router.POST("/proveedor", handlers.CreateProveedor(db))
	router.POST("/Boleta", handlers.CreateBoleta(db))

	//gets          agregar el preload a las tablas cuando se agreguen las fk
	router.GET("/categoria/:id_categoria", handlers.GetCategoria(db))
	router.GET("/categorias", handlers.GetallCategoria(db))
	router.GET("/medicamento/:Id", handlers.GetMedicamento(db))
	router.GET("/medicamentos", handlers.GetallMedicamentos(db))
	router.GET("/usuario/:Id", handlers.GetUsuario(db))
	router.GET("/usuarios", handlers.GetallUsuarios(db))
	router.GET("/proveedores", handlers.GetallProveedores(db))
	router.GET("/medbycategoria/:Id_categoria", handlers.GetMedicamentosByCategoria(db))
	router.GET("/medBioequivalentes", handlers.GetBioequivalentes(db))
	//router.GET("/Boletas",)

	//delete
	router.DELETE("/medicamentos/:id", handlers.DeleteMedicamento(db))
	router.DELETE("/usuario/:id", handlers.Elimina_usuario(db))
	router.DELETE("/proveedor/:id", handlers.DeleteProveedor(db))

	//put
	router.PUT("/medicamentos/:id", handlers.ActualizarMedicamento(db))
	router.PUT("/usuario/:id", handlers.ActualizarUsuario(db))
	router.PUT("/proveedor/:id", handlers.ActualizarProveedor(db))
	router.PUT("/categoria/:id", handlers.ActualizarCategoria(db))

	//Login
	router.POST("/login")

}
