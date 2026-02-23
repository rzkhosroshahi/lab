package main;

import (
	"fmt"
	"basic-controls/exercise"
)

func main() {
	// conditions();
	// loops();
	// arrays();
	// slices();
	// maps();
	// structs();
	// pointers();
	player := exercise.Player{
		Name: "Reza Khosroshahi",
		Inventory: []exercise.Item{
			{Name: "Sword", Type: "Weapon"},
			{Name: "Shield", Type: "Armor"},
		},
	}
	player.PickUpItem(exercise.Item{Name: "Potion", Type: "Consumable"});
}

func conditions () {
	age := 31;

	if age <= 30 {
		fmt.Println("You are young :)")
	} else {
		fmt.Println("You are old :(")	
	}

	day := "Monday";

	switch day {
		case "Monday":
			fmt.Println("Today is Monday")
		case "Tuesday":
			fmt.Println("Today is Tuesday")
		default:
			fmt.Println("Today is not a weekday")
	}
}
func loops () {

	for i:= 0; i < 5; i++ {
		fmt.Printf("Hello World %d\n", i);
	}

	counter := 0
	for counter < 5 {
		fmt.Printf("for like while %d\n", counter);
		counter++;
	}
}
func arrays() {
	// Array and slices
	numbers := [5] int{1, 2, 3, 4, 5};
	fmt.Printf("numbers array: %v - length: %d - capacity: %d\n", numbers, len(numbers), cap(numbers));
	fmt.Printf("last element: %d\n", numbers[len(numbers) - 1]);
	
	for index, value := range numbers {
		fmt.Printf("numbers iteration Index: %d - Value: %d\n", index, value);
	}
}
func slices() {
	fruits := []string{};
	fruits = append(fruits, "apple", "banana", "cherry");
	fmt.Printf("fruits slice: %v - length: %d - capacity: %d\n", fruits, len(fruits), cap(fruits));
	
	numbers := [] int{1, 2, 3, 4, 5};
	allNumbers := numbers[:]
	allNumbers = append(allNumbers, 6, 7, 8, 9, 10);
	fmt.Printf("allNumbers slice: %v - length: %d - capacity: %d\n", allNumbers, len(allNumbers), cap(allNumbers));

	moreFruits := []string{"orange", "pineapple", "mango"};
	allFruits := append(fruits, moreFruits...);
	fmt.Printf("allFruits slice: %v - length: %d - capacity: %d\n", allFruits, len(allFruits), cap(allFruits));
}
func maps() {
	weights := map[string]int {
		"apple": 100,
		"banana": 200,
		"cherry": 300,
	}

	fruit, exists := weights["apple"];
	if exists {
		fmt.Printf("weight for apple is %d\n", fruit);
	} else {
		fmt.Println("apple not found");
	}
	delete(weights, "apple");
	newFruit, exists := weights["apple"];
	if exists {
		fmt.Printf("weight for apple %d\n", newFruit);
	} else {
		fmt.Println("apple not found");
	}
}
// struct
type Person struct {
	Name string
	Age int
	Email string
}
func structs() {
	person := Person{
		Name: "Reza Khosroshahi",
		Age: 30,
		Email: "reza@example.com",
	}
	fmt.Printf("person: %v\n", person);

	person.Name = "Reza";
	person.Age = 31;
	fmt.Printf("person: %v\n", person);

	// anonymous struct 
	employee := struct {
		Name string
		Age int
	}{
		Name: "Reza Khosroshahi",
		Age: 30,
	}
	fmt.Printf("employee: %v\n", employee);

	type Address struct {
		Street string
		City string
	}
	type Contact struct {
		Email string
		Phone string
		Address Address
	}

	contact := Contact{
		Email: "reza@example.com",
		Phone: "1234567890",
		Address: Address{
			Street: "123 Narmak St",
			City: "Tehran",
		},
	}
	fmt.Printf("contact: %v\n", contact);
}
func pointers() {
	person := Person{
		Name: "Reza Khosroshahi",
		Age: 30,
		Email: "reza@example.com",
	}
	fmt.Printf("name before : %v\n", person.Name);
	modifyPerson(person);
	fmt.Printf("name after modify : %v\n", person.Name);
	modifyPersonWithPointer(&person);
	fmt.Printf("name after modify with pointer : %v\n", person.Name);
}
func modifyPerson(person Person) {
	person.Name = "Arash";
	fmt.Println("name inside scope: ", person.Name);
}
func modifyPersonWithPointer(person *Person) {
	person.Name = "Arash Khosroshahi";
	fmt.Println("name inside scope: ", person.Name);
}
// change Person type
// func (person *Person) modifyName(name string) {
// 	person.Name = name;
// }