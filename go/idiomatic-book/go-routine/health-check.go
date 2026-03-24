package goroutine

import (
	"fmt"
	"net/http"
	"time"
)

type Result struct {
	URL    string
	Status string
}

func HealthCheck(url string, ch chan<- Result) {
	resp, err := http.Get(url)
	if err != nil {
		ch <- Result{URL: url, Status: "DOWN ❌"}
		return
	}
	defer resp.Body.Close()
	ch <- Result{URL: url, Status: fmt.Sprintf("UP ✅ (%d)", resp.StatusCode)}
}

func CheckSites() {
	urls := []string{
		"https://google.com",
		"https://github.com",
		"https://golang.org",
		"https://example.com",
		"https://nonexistent.xyz",
	}
	ch := make(chan Result, len(urls))
	start := time.Now()

	for _, url := range urls {
		go HealthCheck(url, ch)
	}
	for range urls {
		result := <-ch
		fmt.Printf("%-30s %s\n", result.URL, result.Status)
	}

	fmt.Printf("\nTotal time: %s\n", time.Since(start))
}
