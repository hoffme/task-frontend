interface Props<P> {
    uri: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: P
    query?: { [key:string]: string | number | boolean }
}

interface Response<R> {
    result?: R
    error?: string
}

class Fetch {

    public static readonly host: string = 'http://localhost:4000';

    public static async fetch<B = void, R = void>(props: Props<B>): Promise<Response<R>> {
        const url = new URL(`${Fetch.host}/api${props.uri}`);

        if (props.query) {
            for (const [key, value] of Object.entries(props.query)) {
                url.searchParams.set(key, value.toString());
            }
        }

        const response = await fetch(url.href, {
            headers: { 'Content-Type': 'application/json' },
            method: props.method || 'GET',
            body: props.body ? JSON.stringify(props.body) : undefined
        });

        return await response.json();
    }

    public static resolveResponse<R>(response: Response<R>): R {
        if (response.error) throw new Error(response.error);
        if (response.result === undefined) throw new Error('empty result');

        return response.result;
    }

}

export default Fetch;
export type {
    Props,
    Response
}