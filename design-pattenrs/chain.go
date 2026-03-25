package main

import "fmt"

type Handler interface {
	SetNext(Handler) Handler
	Handle(request int) string
}
type BaseHandler struct {
	next Handler
}

func (bh *BaseHandler) SetNext(handler Handler) Handler {
	bh.next = handler
	return handler
}
func (h *BaseHandler) Handle(request int) string {
	if h.next != nil {
		return h.next.Handle(request)
	}
	return "unhandled"
}

type SalesHandler struct{ BaseHandler }

func (sh *SalesHandler) Handle(request int) string {
	if request <= 10 {
		return fmt.Sprintf("SalesHandler: handled request %d", request)
	}
	return sh.BaseHandler.Handle(request)
}

type MarketingHandler struct{ BaseHandler }

func (mh *MarketingHandler) Handle(request int) string {
	if request <= 5 {
		return fmt.Sprintf("MarketingHandler: handled request %d", request)
	}
	return mh.BaseHandler.Handle(request)
}

type AgileHandler struct{ BaseHandler }

func (ah *AgileHandler) Handle(request int) string {
	return fmt.Sprintf("AgileHandler: handled request %d", request)
}

func main() {
	sh := &SalesHandler{}
	mh := &MarketingHandler{}
	ah := &AgileHandler{}

	sh.SetNext(mh).SetNext(ah)
	fmt.Println(sh.Handle(75))
	fmt.Println(sh.Handle(10))
	fmt.Println(sh.Handle(75))
}
