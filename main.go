package main

import (
	_ "embed"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"
	"net/http"
	"os"
	"os/exec"
)

//go:embed frontend/dist/index.html
var html string

type WakeResult struct {
	ExitCode int    `json:"exitCode"`
	Output   string `json:"output"`
}

func main() {
	address, ok := os.LookupEnv("LISTEN_ADDRESS")
	if !ok {
		log.Fatal("LISTEN_ADDRESS is not set.")
	}

	iface, ok := os.LookupEnv("INTERFACE_NAME")
	if !ok {
		log.Fatal("INTERFACE_NAME is not set.")
	}

	mac, ok := os.LookupEnv("MAC_ADDRESS")
	if !ok {
		log.Fatal("MAC_ADDRESS is not set.")
	}

	e := echo.New()
	e.Use(middleware.Logger())

	e.GET("/", func(c echo.Context) error {
		return c.HTML(http.StatusOK, html)
	})

	e.POST("/api/wake", func(c echo.Context) error {
		cmd := exec.Command("etherwake", "-D", "-i", iface, mac)

		output, _ := cmd.CombinedOutput()

		return c.JSON(http.StatusOK, &WakeResult{
			ExitCode: cmd.ProcessState.ExitCode(),
			Output:   string(output),
		})
	})

	e.Logger.Fatal(e.Start(address))
}
