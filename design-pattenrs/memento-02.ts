/**
 * Real-World Assignment
    The Drawing Canvas App"
    You are building a simple drawing canvas application. The canvas has the following state:

    A list of shapes on the canvas (each shape has: type, x, y, color, size)
    A background color of the canvas
    A selected tool (e.g. "circle", "rectangle", "pen")

    Your task: Implement the Memento pattern so the canvas supports:

    addShape(shape) — adds a shape to the canvas
    changeBackground(color) — changes the canvas background
    changeTool(tool) — changes the active drawing tool
    save() — saves the current canvas state as a snapshot
    undo() — reverts to the last saved snapshot
    redo() — re-applies an undone snapshot
**/
const shapes = {
    circle: 'circle'
}
type shapeTypes = 'rect' | 'circle' | 'rectangle' | 'triangle';
type Shape = {
    type: shapeTypes;
    x: number;
    y: number;
    color: string;
    size: number;
}
class DrawingCanvas {
    private shapes: Shape[] = [];
    
    addShape(shapes: Shape[]) {
        this.shapes.push(...shapes);
    }
    restore(snapshot: DrawingCanvasSnapshot) {
        const state = snapshot.getState();
        this.shapes = structuredClone(state);
    }
    getShape() {
        return this.shapes;
    }
}
// memento
class DrawingCanvasSnapshot {
    private readonly shape: Shape[] = [];
    constructor(shape: Shape[]) {
        this.shape = structuredClone(shape);
    }
    getState(): Shape[] {
        return this.shape;
    }
}

// care taker
class CanvasHistoryManager {
    constructor(private readonly canvas: DrawingCanvas) {}

    private undoStack: DrawingCanvasSnapshot[] = [];
    private redoStack: DrawingCanvasSnapshot[] = [];
    push(snapshot: DrawingCanvasSnapshot) {
        this.undoStack.push(snapshot);
    }
    pop(): DrawingCanvasSnapshot | undefined {
        const snapshot = this.undoStack.pop();
        if (snapshot) this.redoStack.push(snapshot);
        return snapshot;
    }
    save() {
        const shape = this.canvas.getShape();
        this.redoStack = [];
        if (shape) {
            this.push(new DrawingCanvasSnapshot(shape))
        }
    }
    undo() {
        this.pop();
        const snapshot = this.undoStack[this.undoStack.length - 1];
        if(snapshot) this.canvas.restore(snapshot);
    }
    redo() {
      const snapshot = this.redoStack.pop();
        if (snapshot) {
            this.undoStack.push(snapshot);
            this.canvas.restore(snapshot);
        }
    }
}

const canvas = new DrawingCanvas();
const manager = new CanvasHistoryManager(canvas);

manager.save();                                          
canvas.addShape([{ type: "circle", x: 10, y: 20, color: "red the original", size: 5 }]);
manager.save();                                           
canvas.addShape([{ type: "rect", x: 50, y: 60, color: "blue", size: 10 }]);
manager.save();                                        
console.log('user save changes...');

manager.undo();
console.log('undoing ...');

manager.redo();
console.log('redoing ...');

canvas.addShape([{ type: "triangle", x: 5, y: 5, color: "green", size: 3 }]);
manager.save();