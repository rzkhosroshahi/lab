package routes

import (
	"github.com/go-chi/chi"
	"github.com/rzkhosroshahi/lab/go/simple-project/internals/app"
)

func SetupRoutes(app *app.Application) *chi.Mux {
	r := chi.NewRouter()

	r.Get("/health", app.HealthCheck)
	r.Get("/workout/{id}", app.WorkoutHandler.HandleGetWorkoutByID)
	r.Post("/workout", app.WorkoutHandler.HandleCreateWorkout)
	return r
}
