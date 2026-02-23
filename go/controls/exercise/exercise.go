package exercise;

import (
	"fmt"
)

type Item struct {
	Name string
	Type string
}
type Player struct {
	Name string
	Inventory []Item
}
func (p *Player) DropItem(item Item) {
	for i, item := range p.Inventory {
		if item.Name == item.Name {
			p.Inventory = append(p.Inventory[:i], p.Inventory[i+1:]...);
			return;
		}
	}
}
func (p *Player) PickUpItem(item Item) {
	p.Inventory = append(p.Inventory, item);
	fmt.Printf("Player %s picked up %s\n", p.Name, item.Name);
}
func (p *Player) UseItem(item Item) {
	for i, item := range p.Inventory {
		if item.Name == item.Name {
			p.Inventory = append(p.Inventory[:i], p.Inventory[i+1:]...);
		}
	}
}

func main() {
	fmt.Println("Exercise");
}
