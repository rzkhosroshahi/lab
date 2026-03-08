class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor(value) {
        const newNode = new Node(value);
        this.head = newNode;
        this.tail = newNode;
        this.length = 1;
    }

    push(value) {
        const newNode = new Node(value);
        
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
        return this; 
    }
    pop() {
        if (!this.head) {
            return;
        }

        let pre = this.head;
        let temp = this.head;

        while (temp.next) {
            pre = temp; 
            temp = temp.next;
        }

        this.tail = pre;
        this.tail.next = null;
        this.length--;

        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return this; 
    }
    unshift(value) {
        const newNode = new Node(value);

        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head = {
                ...newNode,
                next: this.head,
            };
        }
        this.length++;
        return this;
    }
    shift() {
        if (!this.head) {
            return;
        }

        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }
        return this;
    }
    get(index) {
        let node = this.head;
       
        if (index < 0 || index >= this.length) {
            throw Error('index shold not be negative or bigger than the length of linked list!');
        }

        for (let i = 0; i < index; i++) {
            node = node.next;
        }
        return node;
    }
    set(index, value) {
        let node = this.head;
        let idx = 0;
       
        if (index < 0) {
            throw Error('index shold not be negative!');
        }

        while(node.next) {
            if (index === idx) {
                node.value = value;
                return node;
            } else {
                node = node.next;
            }
            idx++;
        }
    }
    insert(index, value) {
        if (index === 0) return this.unshift(value);
        if (index === this.length) return this.push(value);
        if (index < 0 || index > this.length) {
            throw Error('index shold not be negative or bigger than the length of linked list!');
        }
        const newNode = new Node(value);
        const temp = this.get(index - 1);
        newNode.next = temp.next;
        temp.next = newNode;
        this.length++;
        return this;
    }
    remove(index) {
        if (index < 0 || index >= this.length) {
            throw Error('index shold not be negative or bigger than the length of linked list!');
        }
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        
        const before = this.get(index - 1);
        const temp = before.next;
        
        before.next = temp.next;
        temp.next = null;
        this.length--;
        return temp;
    }
    reverse() {
        let temp = this.head;
        this.head = this.tail;
        this.tail = temp;
        let prev = null;
        let next = temp.next;

        for (let i = 0; i < this.length; i++) {
            next = temp.next;
            temp.next = prev;
            prev = temp;
            temp = next;
        }
        return this;
    }
}

const newLinkedList = new LinkedList(1);
newLinkedList.push(2);
// newLinkedList.push(3);
// newLinkedList.reverse();
// newLinkedList.push(8);
//newLinkedList.pop()
