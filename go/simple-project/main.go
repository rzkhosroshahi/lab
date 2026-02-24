package main

import (
	"github.com/rzkhosroshahi/lab/go/simple-project/internals/app"
	"github.com/rzkhosroshahi/lab/go/simple-project/internals/http"
	"github.com/rzkhosroshahi/lab/go/simple-project/internals/routes"
)

func main() {
	app, err := app.NewApplication()
	if err != nil {
		panic(err)
	}

	r := routes.SetupRoutes(app)
	http.SetupServer(app, r)
}
