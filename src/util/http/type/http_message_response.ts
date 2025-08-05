
export interface HttpResponse<T> extends ErrorResponseObject {
    data: T;
}

interface ErrorResponseObject { error: ErrorResponse | null };

interface ErrorResponse {
    message: string
    status: string
}
