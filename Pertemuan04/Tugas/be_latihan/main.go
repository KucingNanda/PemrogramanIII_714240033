package main

import (
	"be_latihan/config"
	"be_latihan/model"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	// Init database
	config.InitDB()

	// Auto migrate
	config.GetDB().AutoMigrate(&model.Mahasiswa{})

	fmt.Println("🚀 Server running on http://localhost:3000")

	// Run server
	if err := app.Listen(":3000"); err != nil {
		panic(err)
	}
}
