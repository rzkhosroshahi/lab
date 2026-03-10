import SessionManager from "./session-manager";
import Logger, { LoggerHistoryManger, LogTypes } from "./logger";
import type { ExportFormat } from "./export";
import FilterLogs from './filter-logs';

class DevLogApp {
    private logger: Logger;
    private logManager: LoggerHistoryManger;
    private filterLogs: FilterLogs;

    constructor(SessionManager: SessionManager) {
        const session = SessionManager;
        this.logger = Logger.initiate(session);
        this.logManager = new LoggerHistoryManger(this.logger);
        this.filterLogs = new FilterLogs()
    }
    get logs() {
        return this.logger.Logs;
    }
    log(projectName: string, type: LogTypes = 'info') {
        this.logger.log({
            type,
            project: projectName,
            from: new Date(),
            to: new Date(),
        })
        this.logManager.save();
    }
    undo() {
        this.logManager.undo();
    }
    export(type: ExportFormat) {
        this.logManager.export(type);
    }
    filter() {
        return this.filterLogs.filter(this.logger.Logs);
    }
}

const app = new DevLogApp(SessionManager.initiate());
app.log('front-end');
console.log('front-end add logs >>', app.logs);

app.log('back-end', 'error');
console.log('back-end add logs >>', app.logs);

app.log('middleware', 'warning');
console.log('middleware add logs >>', app.logs);


app.undo();
console.log('undoing ...');
console.log('logs >>', app.logs);

console.log('filter >>', app.filter());
console.log('after logs original >>', app.logs);

console.log('finally export...');
app.export('pdf')