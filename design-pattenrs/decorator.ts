interface HttpClient {
    get(url: string): Promise<string>;
}

abstract class HttpClientDecorator implements HttpClient {
    constructor(private wrappedHttpClient: HttpClient) { }
    async get(url: string): Promise<string> {
        return this.wrappedHttpClient.get(url);
    }
}

class LoggerHttpClientDecorator extends HttpClientDecorator {
    async get(url: string): Promise<string> {
        console.log('CALL LOGGER >>');
        const data = await super.get(url);

        return data;
    }
}
class CachingHttpClient extends HttpClientDecorator {
    private cache = new Map<string, string>();

    async get(url: string): Promise<string> {
        console.log('cache', this.cache.get(url))
        if (this.cache.has(url)) {
            console.log(`[CACHE] Hit for ${url}`);
            return this.cache.get(url)!;
        }
        const result = await super.get(url);
        this.cache.set(url, result);
        return result;
    }
}

class FetchClient implements HttpClient {
    get(url: string): Promise<string> {
        return Promise.resolve(`resolve ${url}`,)
    }
}

const client = new LoggerHttpClientDecorator(new CachingHttpClient(new FetchClient()));

async function call() {
    await client.get('https://cloudflare.com')
    await client.get('https://cloudflare.com')
} 

call();