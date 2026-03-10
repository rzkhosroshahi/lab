import { Log, LogEnum, LogTypes } from "./logger";

interface Handler {
    setNext(handler: Handler): Handler;
    filter(logs: Log[]): void
}
abstract class FilterChain implements Handler {
    private nextHandler: Handler | null = null;
    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }
    filter(logs: Log[]) {
        if(this.nextHandler) {
            return this.nextHandler.filter(logs);
        }
    }
}

class FilterTypeLog extends FilterChain {
    constructor(private type: LogTypes) {
        super();
    }
    filter(logs: Log[]) {
        const filteredLogs = logs.filter(log => log.type === this.type);
        if (filteredLogs.length === 0) {
            console.error(`no ${this.type} logs found!`)
            return;
        }
        super.filter(filteredLogs);
    }
}
class AuthFilter extends FilterChain {
    constructor(private ownerEmail: string) {
        super();
    }
    filter(logs: Log[]) {
        const filteredLogs = logs.filter(log => log.session.email === this.ownerEmail);
        if (filteredLogs.length === 0) {
            console.error('no logs found! by the email >>', this.ownerEmail)
            return;
        }
        super.filter(filteredLogs);
    }
}
class FilterLogs {
    head: FilterChain;
    constructor() {
        const authFilter = new AuthFilter('rz@gmail.com');
        const infoFilter = new FilterTypeLog(LogEnum.INFO);
        const warnFilter = new FilterTypeLog(LogEnum.WARNING);
        authFilter.setNext(infoFilter).setNext(warnFilter);

        this.head = authFilter;
    }
    filter(logs: Log[]) {
        const filteredLogs = structuredClone(logs)
        this.head.filter(filteredLogs);
        return filteredLogs;
    }
}

export default FilterLogs;
