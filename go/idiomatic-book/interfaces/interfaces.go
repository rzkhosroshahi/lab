package interfaces

import "fmt"

type LogicProvider struct{}

func (lp LogicProvider) Process(data string) string {
	// business logic
	return data
}

type Logic interface {
	Process(data string) string
}

type Client struct {
	L Logic
}

func (c *Client) program() string {
	data := "hello"

	return c.L.Process(data)
}

func Run() {
	c := Client{
		L: LogicProvider{},
	}
	fmt.Println("c", c.program())
}
