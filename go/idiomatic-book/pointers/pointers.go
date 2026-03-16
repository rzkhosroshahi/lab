package pointers

type User struct {
	name string
	age  int32
}

func changeUserName(u User, newName string) User {
	u.name = newName
	return u
}
func changeUserNameByPtr(u *User, newName string) {
	u.name = newName
}
func Run() {
	u := User{
		name: "reza",
		age:  31,
	}
	user := changeUserName(u, "ali")
	u.name = user.name
	changeUserNameByPtr(&u, "john")
}
