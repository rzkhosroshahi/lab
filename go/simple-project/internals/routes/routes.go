package routes

import (
	"github.com/go-chi/chi"
	"github.com/rzkhosroshahi/lab/go/simple-project/internals/app"
)

func SetupRoutes(app *app.Application) *chi.Mux {
	r := chi.NewRouter()

	r.Get("/health", app.HealthCheck)
	r.Get("/workouts/{id}", app.WorkoutHandler.HandleGetWorkoutByID)
	r.Post("/workouts", app.WorkoutHandler.HandleCreateWorkout)
	r.Patch("/workouts/{id}", app.WorkoutHandler.HandleUpdateWorkout)
	r.Delete("/workouts/{id}", app.WorkoutHandler.HandleDeleteWorkout)
	// user
	r.Post("/users", app.UserHandler.HandleCreateUser)
	r.Post("/tokens/authentication", app.TokenHandler.HandleCreateToken)
	return r
}
