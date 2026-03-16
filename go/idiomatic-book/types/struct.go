package types

import "fmt"

type Usr struct {
	name string
}

func (u *Usr) Printer() {
	if u == nil { // check nill needs to call Printer with pointer
		fmt.Printf("u")
		return
	}
	fmt.Println("user name >>", u.name)
}

type Status int

const (
	OK Status = 200 + iota
	CANCEL
	DELIVERED
)

// Embedding for Composition
type Employee struct {
	Name string
	ID   int
}

func (em Employee) Description() string {
	return fmt.Sprintf("%s id(%d)", em.Name, em.ID)
}

type Manager struct {
	Employee
	Reports []Employee
}

func RunStruct() {
	fmt.Println(OK, CANCEL, DELIVERED)
	m := Manager{
		Employee: Employee{
			Name: "Reza Khosroshahi",
			ID:   1245,
		},
		Reports: []Employee{},
	}
	fmt.Println(m.ID)
	fmt.Println(m.Description())
}
