class Editor {
    private content: string = '';
    private cursorPointer: number = 0;

    type(content: string) {
        this.content += content;
    }

    setCursorPointer(point: number) {
        this.cursorPointer = point;
    }

    save() {
        return new EditorSnapshot(this.content, this.cursorPointer);
    }

    undo(editor?: EditorSnapshot) {
        if (editor) {
            this.content = editor.getContent();
            this.cursorPointer = editor.getCursorPointer();
        }
    }
    drawUi() {
        console.log("Content--__-- ", this.content);
    }
}
// memento class
class EditorSnapshot {
    private readonly content: string;
    private readonly cursorPointer: number;
    private readonly timestamp: Date;

    constructor (content: string, cursorPointer: number) {
        this.content = content;
        this.cursorPointer = cursorPointer;
        this.timestamp = new Date();
    }

    getContent() {
      return this.content;  
    }
    getCursorPointer() {
      return this.cursorPointer;  
    }
    getTimestamp() {
      return this.timestamp;  
    }
}
// command - care taker
class EditorHistory {
    private history: EditorSnapshot[] = [];
    push(snapShot?: EditorSnapshot): void {
        if (snapShot) this.history.push(snapShot);
    }

    pop(): EditorSnapshot | undefined {
        return this.history.pop();
    }

    size(): number { return this.history.length; }
}

const editor = new Editor();
const appHistory = new EditorHistory();
appHistory.push(editor.save());

editor.type('hello');
editor.drawUi();
appHistory.push(editor.save());

editor.type(', world');
appHistory.push(editor.save());
editor.drawUi();

editor.type('!!!');
editor.drawUi();
appHistory.push(editor.save());

appHistory.pop();
editor.undo(appHistory.pop());
console.log('undoing ......');
editor.drawUi();

editor.undo(appHistory.pop());
console.log('undoing ......');
editor.drawUi();