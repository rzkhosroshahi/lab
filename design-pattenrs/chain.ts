// handler interface
interface ComponentWithContextualHelp {
    showHelp: () => void
}
abstract class Component implements ComponentWithContextualHelp {
    tooltipText: string;
    container: Component

    showHelp() {
        if (this.tooltipText !== null) {
            console.log('COMPONENT - HELP!!', this.tooltipText);
        } else {
            this.container.showHelp();
        }
    }
}
// handler
abstract class Container extends Component {
    children: Component[];

    addChild(child: Component) {
        this.children.push(child);
        child.container = this;
    }
}

class Button extends Component {
    helperText: string;
    status: string;
    constructor(status: string) {
        super();
        this.status = status;
    }

    showHelp(): void {
        if (this.helperText != null) {
            console.log('Button - HELP!!', this.helperText);
        } else {
            super.showHelp();
        }
    }
}

class Panel extends Container {
    modalHelperText: string;

    showHelp(): void {
        if (this.modalHelperText != null) {
            console.log('PANEL - HELP!!', this.modalHelperText);
        } else {
            super.showHelp();
        }
    }
}

class Dialog extends Container {
    wikiPageURL: string;

    showHelp(): void {
        if (this.wikiPageURL != null) {
            console.log('Dialog - HELP!!', this.wikiPageURL);
        } else {
            super.showHelp();
        }
    }
}

class Application {
    dialog: Dialog;
    panel: Panel;
    ok: Button;
    cancel: Button;

    createUi () {
        this.dialog = new Dialog();
        this.dialog.wikiPageURL = "http://wikipedia.com"
        
        this.panel = new Panel();
        this.panel.modalHelperText = 'This is the panel...';

        this.ok = new Button('ok');
        this.ok.helperText = 'OK!';
        
        this.cancel = new Button('cancel!');
        this.cancel.helperText = 'cancel!';
    }
    userClickOnDialog() {
        this.dialog.showHelp();
    }
    userClickOnPanel() {
        this.panel.showHelp();
    }
    userClickOnOk() {
        this.ok.showHelp();
    }
    userClickOnCancel() {
        this.cancel.showHelp();
    }
}

const app = new Application();
app.createUi();

app.userClickOnDialog();