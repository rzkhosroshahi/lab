package store

import (
	"database/sql"

	"gorm.io/gorm"
)

type Workout struct {
	ID              int            `json:"id"`
	UserID          int            `json:"user_id" gorm:"-"`
	Title           string         `json:"title"`
	Description     string         `json:"description"`
	DurationMinutes int            `json:"duration_minutes"`
	CaloriesBurned  int            `json:"calories_burned"`
	Entries         []WorkoutEntry `json:"entries" gorm:"-"`
}

type WorkoutEntry struct {
	ID              int      `json:"id"`
	WorkoutID       int      `json:"workout_id"`
	ExerciseName    string   `json:"exercise_name"`
	Sets            int      `json:"sets"`
	Reps            *int     `json:"reps"`
	DurationSeconds *int     `json:"duration_seconds"`
	Weight          *float64 `json:"weight"`
	Notes           string   `json:"notes"`
	OrderIndex      int      `json:"order_index"`
}

type PostgresWorkoutStore struct {
	db *gorm.DB
}

func NewPostgresWorkoutStore(db *gorm.DB) *PostgresWorkoutStore {
	return &PostgresWorkoutStore{db: db}
}

type WorkoutStore interface {
	CreateWorkout(*Workout) (*Workout, error)
	GetWorkoutByID(id int64) (*Workout, error)
	UpdateWorkout(*Workout) error
	DeleteWorkout(id int64) error
}

func (pg *PostgresWorkoutStore) CreateWorkout(workout *Workout) (*Workout, error) {
	err := pg.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(workout).Error; err != nil {
			return err
		}

		for i := range workout.Entries {
			workout.Entries[i].WorkoutID = workout.ID
			if err := tx.Create(&workout.Entries[i]).Error; err != nil {
				return err
			}
		}

		return nil
	})
	if err != nil {
		return nil, err
	}

	return workout, nil
}

func (pg *PostgresWorkoutStore) GetWorkoutByID(id int64) (*Workout, error) {
	workout := &Workout{}

	if err := pg.db.First(workout, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	var entries []WorkoutEntry
	if err := pg.db.
		Where("workout_id = ?", id).
		Order("order_index").
		Find(&entries).Error; err != nil {
		return nil, err
	}

	workout.Entries = entries

	return workout, nil
}

func (pg *PostgresWorkoutStore) UpdateWorkout(workout *Workout) error {
	return pg.db.Transaction(func(tx *gorm.DB) error {
		result := tx.Model(&Workout{}).
			Where("id = ?", workout.ID).
			Updates(map[string]interface{}{
				"title":            workout.Title,
				"description":      workout.Description,
				"duration_minutes": workout.DurationMinutes,
				"calories_burned":  workout.CaloriesBurned,
			})
		if result.Error != nil {
			return result.Error
		}

		if result.RowsAffected == 0 {
			return sql.ErrNoRows
		}

		if err := tx.Where("workout_id = ?", workout.ID).Delete(&WorkoutEntry{}).Error; err != nil {
			return err
		}

		for i := range workout.Entries {
			workout.Entries[i].WorkoutID = workout.ID
			if err := tx.Create(&workout.Entries[i]).Error; err != nil {
				return err
			}
		}

		return nil
	})
}

func (pg *PostgresWorkoutStore) DeleteWorkout(id int64) error {
	result := pg.db.
		Where("id = ?", id).
		Delete(&Workout{})
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return sql.ErrNoRows
	}
	return nil
}
