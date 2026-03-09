package routes

import (
	"github.com/go-chi/chi"
	"github.com/rzkhosroshahi/lab/go/simple-project/internals/app"
)

func SetupRoutes(app *app.Application) *chi.Mux {
	r := chi.NewRouter()
	r.Group(func(r chi.Router) {
		r.Use(app.Middleware.Authenticate)

		r.Get("/workouts/{id}", app.Middleware.RequireUser(app.WorkoutHandler.HandleGetWorkoutByID))
		r.Post("/workouts", app.Middleware.RequireUser(app.WorkoutHandler.HandleCreateWorkout))
		r.Patch("/workouts/{id}", app.Middleware.RequireUser(app.WorkoutHandler.HandleUpdateWorkout))
		r.Delete("/workouts/{id}", app.Middleware.RequireUser(app.WorkoutHandler.HandleDeleteWorkout))
	})
	r.Get("/health", app.HealthCheck)
	r.Post("/users", app.UserHandler.HandleCreateUser)
	r.Post("/tokens/authentication", app.TokenHandler.HandleCreateToken)
	return r
}
