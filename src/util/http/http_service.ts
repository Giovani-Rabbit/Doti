import axios, { AxiosRequestConfig } from 'axios';
import { IHttpRequestParams } from './type/http_request_params';

class HttpService {
    private baseUrl: string;
    private path: string;

    constructor(path: string) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) throw new Error(
            "API_URL Environment variable not found"
        );

        this.baseUrl = apiUrl.trim();
        this.path = path;
    }

    public async get<T>(params: IHttpRequestParams<null>): Promise<T> {
        return this.request<T, null>({
            ...params,
            url: this.getFullUrl(params.url),
            method: "GET"
        });
    }

    public async post<T, P>(params: IHttpRequestParams<P>): Promise<T> {
        return this.request<T, P>({
            ...params,
            url: this.getFullUrl(params.url),
            method: "POST"
        });
    }

    public async put<T, P>(params: IHttpRequestParams<P>): Promise<T> {
        return this.request<T, P>({
            ...params,
            url: this.getFullUrl(params.url),
            method: "PUT"
        });
    }

    public async delete<T>(params: IHttpRequestParams<null>): Promise<T> {
        return this.request<T, null>({
            ...params,
            url: this.getFullUrl(params.url),
            method: "DELETE"
        });
    }

    private async request<T, P>(params: IHttpRequestParams<P>): Promise<T> {
        const requestParam: AxiosRequestConfig = {
            ...params,
            // withCredentials: true,
        };

        return await axios.request(requestParam);
    }

    private getFullUrl(url: string): string {
        if (
            url.startsWith('http://') ||
            url.startsWith('https://')
        ) return url;

        const pathWithoutSlash = this.removeExtraSlashes(this.path);
        const urlWithoutSlash = url ? this.removeExtraSlashes(url) : '';

        const finalPath = urlWithoutSlash
            ? `${pathWithoutSlash}/${urlWithoutSlash}`
            : pathWithoutSlash;

        return new URL(finalPath, this.baseUrl).toString();
    }

    // remove the slash from the beginning and end
    private removeExtraSlashes(url: string): string {
        return url.replace(/^\/+|\/+$/g, '');
    }
}

export default HttpService;
