import axios, { AxiosError } from 'axios';
import { IHttpRequestParams } from './type/http_request_params';
import { IHttpResponse } from './type/http_message_response';

class HttpService {
    private baseUrl: string;

    constructor(private path: string) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) throw new Error(
            "API_URL Environment variable not found"
        );

        this.baseUrl = apiUrl.trim();
    }

    public async get<O>(params: IHttpRequestParams<null>): Promise<IHttpResponse<O>> {
        return await this.request<null, O>({
            ...params,
            url: this.getFullUrl(params.url),
            method: "GET"
        });
    }

    public async post<I, O>(params: IHttpRequestParams<I>): Promise<IHttpResponse<O>> {
        return await this.request<I, O>({
            ...params,
            url: this.getFullUrl(params.url),
            method: "POST"
        });
    }

    public async put<I, O>(params: IHttpRequestParams<I>): Promise<IHttpResponse<O>> {
        return await this.request<I, O>({
            ...params,
            url: this.getFullUrl(params.url),
            method: "PUT"
        });
    }

    public async patch<I, O>(params: IHttpRequestParams<I>): Promise<IHttpResponse<O>> {
        return await this.request<I, O>({
            ...params,
            url: this.getFullUrl(params.url),
            method: "PATCH"
        })
    }

    public async delete<O>(params: IHttpRequestParams<null>): Promise<IHttpResponse<O>> {
        return await this.request<null, O>({
            ...params,
            url: this.getFullUrl(params.url),
            method: "DELETE"
        });
    }

    private async request<I, O>(params: IHttpRequestParams<I>): Promise<IHttpResponse<O>> {
        try {
            const response = await axios.request<O>({
                ...params,
                withCredentials: true,
            });

            return {
                data: response.data,
                error: null,
            };
        } catch (err) {
            let message = "Unknown error";
            let status: string | number = "UNKNOWN";

            if (axios.isAxiosError(err)) {
                const axiosErr = err as AxiosError<{ message?: string; status?: string | number }>;
                message = axiosErr.response?.data?.message || axiosErr.message || message;
                status = axiosErr.response?.data?.status || axiosErr.response?.status || status;
            }

            return {
                data: null,
                error: { message, status },
            };
        }
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
