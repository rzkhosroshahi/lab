// LIFO
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
class Stack {
    constructor(value) {
        if (!value) return;
        const newNode = new Node(value);
        this.top = newNode;
        this.end = newNode;
        this.length = 1;
    }
    push(value) {
        const newNode = new Node(value);

        if (!this.top) {
            this.top = newNode;
            this.end = newNode;
            return this;
        } else {
            newNode.next = this.top;
            this.top = newNode;
        }
        this.length++;
        return newNode;
    }
    pop() {
        if (this.length === 0) {
            return undefined;
        }
        let temp = this.top;
        this.top = this.top.next;
        temp.next = null;

        this.length--;
        return temp;
    }
    peak() {
        return this.top;
    }
}

// const stack = new Stack(1);
// stack.push(0);
// stack.push(-1);
// stack.pop();

function reverseString(str) {
    const stack = new Stack();
    let reversedString = '';
    for (let s of str) {
        stack.push(s);
    }
    for (let s of str) {
        reversedString += stack.pop().value;
    }
    return reversedString;
}
reverseString('hello world  of thessse.    days    ');

function isBalancedParentheses(str) {
    const stack = new Stack();
    for (let w of str) {
        if (w === '(') {
            stack.push(w);
        }
        if (w === ')') {
            stack.pop();
        }
    }

    return !stack.length;
}
//isBalancedParentheses("(()())") // true
//isBalancedParentheses("(()") // false
isBalancedParentheses(")(") // false