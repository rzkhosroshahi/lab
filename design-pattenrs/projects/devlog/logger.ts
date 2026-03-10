import type { Session } from "./session-manager";
import SessionManager from "./session-manager";
import { Nullable } from "./types";
import Exporter, { ExportFormat } from "./export";
import FilterLogs from './filter-logs';

export const LogEnum = {
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error'
} as const;

export type LogTypes = typeof LogEnum[keyof typeof LogEnum];
export type Log = {
    type?: LogTypes,
    session: Session,
    project: string,
    from: Date,
    to: Date,
}
type LogPayload = Pick<Log, 'project' | 'type' | 'from' | 'to'>;
export class Logger {
    private constructor(private sessionManager: SessionManager) {}
    private static instance: Nullable<Logger> = null;
    private logs: Log[] = [] ;

    public static initiate(sessionManager: SessionManager): Logger {
        if (!this.instance) {
            this.instance = new Logger(sessionManager);
        }
        return this.instance;
    }
    log({ project, from, to, type = 'info' }: LogPayload) {
        this.logs.push({
            session: this.sessionManager.Session,
            type,
            project,
            from,
            to
        });
    }
    get Logs () {
        return this.logs;
    }
    restore(logSnapshot: LoggerSnapshot | undefined) {
        this.logs = logSnapshot?.getSnapshot() ?? [];
    }
}
// memento
class LoggerSnapshot {
    private logs: Log[] = [];
    constructor(logs: Log[]) {
        this.logs = structuredClone(logs);
    }

    getSnapshot() {
        return this.logs;
    }
}
// care taker
export class LoggerHistoryManger {
    private historyStack: LoggerSnapshot[] = [];
    private exporter: Exporter;
    constructor(private logger: Logger) {
        this.exporter = new Exporter();
    }

    push(log: Log[]) {
        this.historyStack.push(new LoggerSnapshot(log));
    }
    pop() {
        if (this.historyStack) {
            return this.historyStack.pop();
        }
    }
    save() {
        const snapshot = this.logger.Logs;
        this.historyStack.push(new LoggerSnapshot(snapshot));
    }
    undo() {
        this.pop();
        const history = this.historyStack[this.historyStack.length - 1];
        this.logger.restore(history);
    }
    export(type: ExportFormat) {
        this.exporter.export(type,  JSON.stringify(this.logger.Logs, null, 2));
    }
}

export default Logger;