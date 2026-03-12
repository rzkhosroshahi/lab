type Request = {
    url: string;
    method: string;
    headers: Record<string, string>;
    body: unknown;
};

type Response = {
    status: number;
    body: string;
};

type MiddlewareFn = (req: Request, res: Response, next: () => void) => void;

class App {
    private middlewares: MiddlewareFn[] = [];
    use(middleware: MiddlewareFn): void {
        this.middlewares.push(middleware)
    }
    run(req: Request) {
        const res: Response = { status: 200, body: '' };
        let idx = 0;

        const next = () => {
            const middleware = this.middlewares[++idx];
            if (middleware) middleware(req, res, next);
        };

        next();
        return res;
    }
}

const test = new App();
test.use((req, res, next) => {
    console.log('1')
    next();
})

test.use((req, res, next) => {
    console.log('2');
    next();
})

test.use((req, res, next) => {
    console.log('3')
    next();
})

test.use((req, res, next) => {
    console.log('4')
})
test.run({
    url: "",
    method: "",
    headers: {},
    body: undefined
});