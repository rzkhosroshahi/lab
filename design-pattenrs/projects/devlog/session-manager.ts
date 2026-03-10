import config from "./config";
import type { Config, Nullable } from "./types";

export type Session = Config & {
    timestamp: Date,
};
class SessionManager {
    private static instance: Nullable<SessionManager> = null;
    session: Session;

    private constructor() {
        console.log('SessionManger created!');
        this.session = {
            ...config,
            timestamp: new Date()
        }
    }

    static initiate(): SessionManager {
        if(!this.instance) {
            this.instance = new SessionManager();
        }
        return this.instance;
    }

    get Session() {
        return this.session;
    }
}

export default SessionManager;
