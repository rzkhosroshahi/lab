package app

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/rzkhosroshahi/lab/go/simple-project/internals/api"
	"github.com/rzkhosroshahi/lab/go/simple-project/internals/config"
	"github.com/rzkhosroshahi/lab/go/simple-project/internals/store"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type Application struct {
	Logger         *log.Logger
	WorkoutHandler *api.WorkoutHandler
	DB             *sql.DB
}

func NewApplication() (*Application, error) {
	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

	dbCfg := config.LoadDBConfig()

	gormDB, sqlDB, err := openGormDB(dbCfg, logger)
	if err != nil {
		return nil, err
	}

	if err := autoMigrate(gormDB); err != nil {
		return nil, fmt.Errorf("auto migrate: %w", err)
	}

	// our store will go here
	workoutStore := store.NewPostgresWorkoutStore(gormDB)
	// our handlers will go here
	workoutHandler := api.NewWorkoutHandler(workoutStore, logger)

	app := &Application{
		Logger:         logger,
		WorkoutHandler: workoutHandler,
		DB:             sqlDB,
	}

	return app, nil
}

func (a *Application) HealthCheck(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "status is available\n")
}

func openGormDB(cfg config.DBConfig, l *log.Logger) (*gorm.DB, *sql.DB, error) {
	gormDB, err := gorm.Open(
		postgres.Open(cfg.DSN()),
		&gorm.Config{
			Logger: logger.New(
				log.New(os.Stdout, "gorm: ", log.LstdFlags),
				logger.Config{
					SlowThreshold:             time.Second,
					LogLevel:                  logger.Info,
					IgnoreRecordNotFoundError: true,
					Colorful:                  true,
				},
			),
		},
	)
	if err != nil {
		return nil, nil, fmt.Errorf("open gorm db: %w", err)
	}

	sqlDB, err := gormDB.DB()
	if err != nil {
		return nil, nil, fmt.Errorf("underlying sql db: %w", err)
	}

	// Basic connection pool settings; adjust as needed.
	sqlDB.SetMaxIdleConns(5)
	sqlDB.SetMaxOpenConns(10)
	sqlDB.SetConnMaxLifetime(time.Hour)

	l.Println("Connected to Database via GORM...")

	return gormDB, sqlDB, nil
}

func autoMigrate(db *gorm.DB) error {
	return db.AutoMigrate(&store.Workout{}, &store.WorkoutEntry{})
}

