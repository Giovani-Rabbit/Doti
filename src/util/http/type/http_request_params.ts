import { Method, RawAxiosRequestHeaders } from "axios";

export interface IHttpRequestParams<T> {
    contentType?: "application/json";
    data?: T;
    headers?: RawAxiosRequestHeaders;
    method?: Method;
    params?: Object;
    url: string;
}