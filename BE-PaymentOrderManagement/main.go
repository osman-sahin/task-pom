package main

import (
	"be-paymentordermanagement/app/router"
	"be-paymentordermanagement/config"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	godotenv.Load()
	config.InitLog()
}

func main() {
	port := os.Getenv("PORT")
	init := config.Init()
	app := router.Init(init)

	app.Use(CORS)
	app.Run(":" + port)
}
func CORS(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Methods", "*")
	c.Header("Access-Control-Allow-Headers", "*")
	if c.Request.Method != "OPTIONS" {
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusOK)
	}
}
