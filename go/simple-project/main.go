package main

import (
	"github.com/rzkhosroshahi/lab/go/simple-project/internals/app"
)

func main() {
	app, err := app.NewApplication()

	if err != nil {
		panic(err)
	}

	app.Logger.Println("Application started successfully!")
}
