interface Options extends RequestInit {
    data?: object;
    token?: string;
    noContentType?: boolean;
}
interface RejectCallBack {
    // eslint-disable-next-line no-unused-vars
    (reason: object): void;
}

interface ResolveCallBack<T> {
    // eslint-disable-next-line no-unused-vars
    (value: T | PromiseLike<T>): void;
}

interface ClientError {
    message: string;
    [key: string]: any;
}

const apiError = {
    error: true,
    status: null,
    response: null,
};

// eslint-disable-next-line max-len
const handleServerResponse = <T>(response: Response, resolve: ResolveCallBack<T>, reject: RejectCallBack) => response
        .json()
        .then((responseBody: T) => {
            if (response.ok) {
                return resolve(responseBody);
            }
            // BadRequest
            return reject({
                ...apiError,
                status: response.status,
                response: responseBody,
            });
        })
        .catch(() => reject({
                ...apiError,
                status: response.status,
                response: response.statusText,
            }));

const handleClientError = (error: ClientError, reject: RejectCallBack) => reject({
        ...apiError,
        response: error.message,
    });

export const api = async <T>(url: string, options: Options = {}): Promise<T> => {
    const apiOptions: Options | any = options;

    const defaultHeaders: any = {
        Accept: 'application/json',
    };
    if (!options.noContentType) {
        defaultHeaders['Content-Type'] = 'application/json';
    }

    if (!apiOptions) {
        apiOptions.headers = {};
    }

    apiOptions.headers = {
        ...defaultHeaders,
        ...options.headers,
    };

    if (apiOptions.data) {
        apiOptions.body = JSON.stringify(apiOptions.data);
        delete apiOptions.data;
        if (!apiOptions.method) apiOptions.method = 'POST';
    }

    // if (session?.user?.token) {
    //     apiOptions.headers = {
    //         ...options.headers,
    //         Authorization: `Bearer ${session.user.token}`,
    //     };
    //     delete apiOptions.token;
    // }
    console.log(process.env.REACT_APP_BASE_URL);
    return new Promise<T>((resolve: ResolveCallBack<T>, reject: RejectCallBack) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, apiOptions)
            .then((response: Response) => handleServerResponse<T>(response, resolve, reject))
            .catch((error: ClientError) => handleClientError(error, reject));
    });
};

export default null;
