package goroutine

import (
	"fmt"
	"time"
)

func producer(ch chan<- string, msg string, delay time.Duration) {
	time.Sleep(delay)
	ch <- msg
}

func RunSelect() {
	chA := make(chan string)
	chB := make(chan string)

	go producer(chA, "hello from A", 2*time.Second)
	go producer(chB, "hello from B", 1*time.Second)

	timeout := time.After(3 * time.Second)
	for {
		select {
		case msgA := <-chA:
			fmt.Println("Received from A:", msgA)

		case msgB := <-chB:
			fmt.Println("Received from B:", msgB)

		case <-timeout:
			close(chA)
			close(chB)
			// default:
			// 	fmt.Println("nothing ready, moving on")
		}
	}
}
