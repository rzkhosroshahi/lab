package types

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

// like third parties
type PayPalSDK struct {
	apiKey string
}

func (py PayPalSDK) getCharge(amount int) {
	fmt.Println("paying with PayPal >>", amount)
}

type SupportedPay interface {
	Pay(amount int)
}

type PayPalAdaptor struct {
	PayPalSDK
}

func (pp PayPalAdaptor) Pay(amount int) {
	pp.getCharge(amount)
}

func Checkout(payment SupportedPay) {
	payment.Pay(1000000)
}
func Run() {
	c := Client{
		L: LogicProvider{},
	}
	fmt.Println("c", c.program())

	// combining interface and embedd type -> dependency injection nice!
	Checkout(PayPalAdaptor{PayPalSDK{apiKey: "paypal-013939"}})
}
