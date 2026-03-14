class File {
    constructor(
        public name: string,
        public size: number
    ) {}
}
type FileSystemNode = File | Directory;

interface Iterator<T> {
    hasNext(): boolean;
    next(): T;
}
class FileIterator implements Iterator<File> {
    private index = 0;
    private files: File[] = [];

    constructor(private root: Directory) {
        this.collectFiles(this.root);
    }

    private collectFiles(root: Directory) {
        for (const child of root.children) {
            if (child instanceof File) {
                this.files.push(child);
            } else {
                this.collectFiles(child);
            }
        }
    }
    hasNext(): boolean {
        return this.index < this.files.length;
    }

    next(): File {
        if (!this.hasNext()) throw Error('no more files!');
        return this.files[this.index++];
    }
}

interface Iterable<T> {
    createIterator(): Iterator<T>;
}
class Directory implements Iterable<File> {
    public children: FileSystemNode[] = [];
    constructor(public name: string) {}

    addChild(node: FileSystemNode) {
        this.children.push(node);
    }
    createIterator(): Iterator<File> {
        return new FileIterator(this);
    }
}

const root = new Directory("root");
const src = new Directory("src");

root.children.push(new File("a.pdf", 100));
src.children.push(new File("index.ts", 200));
src.children.push(new File("util.ts", 150));
root.children.push(src);
root.children.push(new File("a.ts", 100));

function getTotalSize(dir: Directory) {
    let total = 0;
    const fileIterator = dir.createIterator();

    while(fileIterator.hasNext()) {
        total += fileIterator.next().size;
    }
    return total;
}
function findByExtension(dir: Directory, ext: string): File[] {
    const files: File[] = [];
    const fileIterator = dir.createIterator();

    while(fileIterator.hasNext()) {
        const currentFile = fileIterator.next();

        if (currentFile.name.endsWith(ext)) {
            files.push(currentFile)
        }
    }
    return files;
}

console.log('find pfd files ', findByExtension(root, 'pdf'));
console.log('root folder total size ', getTotalSize(root));