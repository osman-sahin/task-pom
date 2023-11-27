package router

import (
	config "be-paymentordermanagement/config"

	// "github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func Init(init *config.Initialization) *gin.Engine {

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	api := router.Group("/api")
	{
		payments := api.Group("/payments")
		payments.GET("", init.PaymentCtrl.GetAll)
		payments.POST("", init.PaymentCtrl.Add)
		payments.GET("/:id", init.PaymentCtrl.GetById)
		payments.PUT("/:id", init.PaymentCtrl.Update)
		payments.DELETE("/:id", init.PaymentCtrl.Delete)
	}

	return router
}

// func CORSConfig() cors.Config {
// 	corsConfig := cors.DefaultConfig()
// 	corsConfig.AllowAllOrigins = true
// 	corsConfig.AllowCredentials = true
// 	corsConfig.AddAllowHeaders("Access-Control-Allow-Headers", "Content-Type")
// 	corsConfig.AddAllowMethods("GET", "POST", "PUT", "DELETE")
// 	return corsConfig
// }

// func CORSMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {

// 		c.Header("Access-Control-Allow-Origin", "http://localhost:4200")
// 		c.Header("Access-Control-Allow-Credentials", "true")
// 		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
// 		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

// 		if c.Request.Method == "OPTIONS" {
// 			c.AbortWithStatus(204)
// 			return
// 		}
// 		c.Next()
// 	}
// }

// CORS Middleware
// func CORS(c *gin.Context) {

// 	// First, we add the headers with need to enable CORS
// 	// Make sure to adjust these headers to your needs
// 	c.Header("Access-Control-Allow-Origin", "*")
// 	c.Header("Access-Control-Allow-Methods", "*")
// 	c.Header("Access-Control-Allow-Headers", "*")
// 	c.Header("Content-Type", "application/json")

// 	// Second, we handle the OPTIONS problem
// 	if c.Request.Method != "OPTIONS" {

// 		c.Next()

// 	} else {

// 		// Everytime we receive an OPTIONS request,
// 		// we just return an HTTP 200 Status Code
// 		// Like this, Angular can now do the real
// 		// request using any other method than OPTIONS
// 		c.AbortWithStatus(http.StatusOK)
// 	}
// }

// func enableCors(w *http.ResponseWriter) {
// 	(*w).Header().Set("Access-Control-Allow-Origin", "*")
// }
