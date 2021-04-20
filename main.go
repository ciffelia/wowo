package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
	"os"
	"os/exec"
)

type WakeResult struct {
	ExitCode int    `json:"exitCode"`
	Output   string `json:"output"`
}

func main() {
	iface := os.Getenv("INTERFACE_NAME")
	mac := os.Getenv("MAC_ADDRESS")

	e := echo.New()
	e.Use(middleware.Logger())

	e.POST("/api/wake", func(c echo.Context) error {
		cmd := exec.Command("sudo", "etherwake", "-D", "-i", iface, mac)

		output, _ := cmd.CombinedOutput()

		return c.JSON(http.StatusOK, &WakeResult{
			ExitCode: cmd.ProcessState.ExitCode(),
			Output: string(output),
		})
	})

	e.Static("/", "static")

	e.Logger.Fatal(e.Start(":3000"))
}
