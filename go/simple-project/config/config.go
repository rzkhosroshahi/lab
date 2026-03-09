package config

import "github.com/spf13/viper"

type DB_CONNECTION struct {
	Host     string
	Port     string
	User     string
	Password string
	Name     string
	SslMode  string
}

func GetDBConnection() *DB_CONNECTION {
	viper.SetDefault("DB_HOST", "localhost")
	viper.SetDefault("DB_PORT", "5432")
	viper.SetDefault("DB_USER", "postgres")
	viper.SetDefault("DB_PASSWORD", "postgres")
	viper.SetDefault("DB_NAME", "postgres")
	viper.SetDefault("DB_SSLMODE", "disable")

	viper.AutomaticEnv()

	host := viper.GetString("DB_HOST")
	port := viper.GetString("DB_PORT")
	user := viper.GetString("DB_USER")
	password := viper.GetString("DB_PASSWORD")
	name := viper.GetString("DB_NAME")
	sslMode := viper.GetString("DB_SSLMODE")

	return &DB_CONNECTION{
		Host:     host,
		Port:     port,
		User:     user,
		Password: password,
		Name:     name,
		SslMode:  sslMode,
	}
}
