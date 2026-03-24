package goroutine

import "fmt"

// unbuffered
func unbuffy() {
	ch := make(chan int)

	// We launch a second goroutine to act as the receiver [5]
	go func() {
		value := <-ch // This goroutine pauses here until someone writes to ch [1]
		fmt.Println("Received:", value)
	}()

	ch <- 42 // The main goroutine pauses here until the goroutine above reads the 42 [1]
	fmt.Println("Handoff complete!")
}

func forLoopGoR() {
	a := []int{2, 4, 6, 8, 10}
	ch := make(chan int, len(a))
	for _, v := range a {
		go func() {
			ch <- v * 2
		}()
	}
	for i := 0; i < len(a); i++ {
		fmt.Println(<-ch)
	}
}

func countTo(max int) <-chan int {
	ch := make(chan int)

	go func() {
		for i := range max {
			ch <- i
		}
		close(ch)
	}()
	return ch
}

func Run() {
	// unbuffy()
	// forLoopGoR()
	for i := range countTo(5) {
		fmt.Println("i is:", i)
	}
}
