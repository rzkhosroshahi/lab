class Node {
    constructor(value) {
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class BST { 
    constructor() {
        this.root = null;
    }
    insert(value) {
        const node = new Node(value);
        if (this.root === null) {
            this.root = node;
            return;
        }
        let temp = this.root;

        while (true) {
            if (value === temp.value) return undefined;

            if (value < temp.value) {
                if (temp.left === null) {
                    temp.left = node;
                    return this;
                }
                temp = temp.left; 
            } else {
                if (temp.right === null) {
                    temp.right = node;
                    return this;
                }
                temp = temp.right; 
            }
        } 

    }
    lookup(value) {
        if (this.root === null) return undefined;
        let temp = this.root;

        while(temp) {
            if (value < temp.value) {
                temp = temp.left;
            } else if (value > temp.value) {
                temp = temp.right;
            } else {
                return temp;
            }
        }
        return false;
    }
    bfs() {
        let currentNode = this.root;
        const queue = [];
        const results = [];
        queue.push(this.root);

        while(queue.length) {
            currentNode = queue.shift();
            results.push(currentNode.value);

            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
        return results;
    }
    dfsPreOrder() {
        let results = [];
        function traverse(currentNode) {
            results.push(currentNode.value);
            if (currentNode.left) traverse(currentNode.left);
            if (currentNode.right) traverse(currentNode.right);
        }
        traverse(this.root);
        return results;
    }
    dfsInOrder() {
        const results = [];

        function traverse(currentNode) {
            if (currentNode.left) traverse(currentNode.left);
            results.push(currentNode.value);
            if (currentNode.right) traverse(currentNode.right);
        }
        traverse(this.root);

        return results;
    }
    dfsPostOrder() {
        const results = [];

        function traverse(currentNode) {
            if (currentNode.left) traverse(currentNode.left);
            if (currentNode.right) traverse(currentNode.right);
            results.push(currentNode.value);
        }
        traverse(this.root);

        return results;
    }
    findRoot() {
        if (this.root === null) return;
        let temp = this.findLastLeft();
        if (temp === null) return;
        let root = this.root;

        while(true) {
            console.log('root ', root);
            console.log('temp', temp);
            if (temp.value === root.left.value) return root;
            root = temp.left;
        }
    }
    findLastLeft() {
        let temp = this.root;
        if (temp === null) return;

        while(temp.left !== null) {
            temp = temp.left;
        }
        return temp;
    }
}

const tree = new BST();
tree.insert(47);
tree.insert(21);
tree.insert(18);
tree.insert(27);
tree.insert(76);
tree.insert(52);
tree.insert(82);
// tree.findLastLeft();
// tree.findRoot();
tree.dfsPreOrder();
//tree.dfsInOrder();
//tree.dfsPostOrder();