
export interface HttpResponse<T> {
    data: T;
    error: ErrorResponseObject
}

interface ErrorResponseObject { error: ErrorResponse | null };

interface ErrorResponse {
    error: string
    status: string
}
