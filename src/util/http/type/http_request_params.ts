import { AxiosRequestConfig, Method, RawAxiosRequestHeaders } from "axios";

export interface IHttpRequestParams<T> extends AxiosRequestConfig {
    contentType?: "application/json";
    data?: T;
    headers?: RawAxiosRequestHeaders;
    method?: Method;
    params?: object;
    url: string;
}