package http

import (
	"flag"
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/rzkhosroshahi/lab/go/simple-project/internals/app"
	"github.com/rzkhosroshahi/lab/go/simple-project/internals/routes"
)

func SetupServer(app *app.Application, routeHandler *chi.Mux) (int, error) {
	var port int
	flag.IntVar(&port, "port", 8080, "go backend server port")
	flag.Parse()
	r := routes.SetupRoutes(app)

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", port),
		Handler:      r,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	app.Logger.Printf("app is runing on port %d", port)

	err := server.ListenAndServe()
	if err != nil {
		app.Logger.Fatal(err)
	}
	return port, err
}
