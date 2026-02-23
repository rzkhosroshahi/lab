package main;

import (
	"fmt"
)

func main() {
	fmt.Println("Hello world");
	var myName string = "Reza Khosroshahi";
	fmt.Printf("This is my name %s\n", myName)
	birthYear := 1994;
	fmt.Printf("This is my birth year %d\n", birthYear);

	// multiple variables
	var (
		isEmployee bool = true;
		salary int = 100000;
		currency string = "USD";
	)

	fmt.Printf("Is employee: %t\n", isEmployee);
	fmt.Printf("Salary: %d\n", salary);
	fmt.Printf("Currency: %s\n", currency);

	const (
		Monday  = 1
		Tuesday = 2
		Wednesday = 3
	)
	fmt.Printf("Monday: %d- Tuesday: %d- Wednesday: %d\n", Monday, Tuesday, Wednesday);

	const (
		Jan int = iota + 1
		Feb
		Mar
	)
	fmt.Printf("Jan: %d- Feb: %d- Mar: %d\n", Jan, Feb, Mar);

	addValue := add(1, 2);
	fmt.Printf("add func: %d\n", addValue);

	sum, product := calculateSumAndProduct(1, 2);
	fmt.Printf("sum: %d - product: %d\n", sum, product);
}

func add(a int, b int) int {
	return a + b;
}

func calculateSumAndProduct(a int, b int) (int, int) {
	return a + b, a * b;
}