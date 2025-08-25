
export interface IHttpResponse<O> {
    data: O | null;
    error: ErrorResponse | null;
}

interface ErrorResponse {
    message: string
    status: string | number
}
