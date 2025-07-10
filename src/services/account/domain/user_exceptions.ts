
export type UserErrorStatus =
    | "USER_ALREADY_EXISTS"
    | "INVALID_CREDENTIALS"
    | "EMAIL_REQUIRED"
    | "INVALID_PASSWORD"
    | "UNKNOWN";

export function mapUserErrorCodeToMessage(code: UserErrorStatus): string {
    switch (code) {
        case "USER_ALREADY_EXISTS":
            return "Este e-mail já está em uso.";
        case "INVALID_CREDENTIALS":
            return "E-mail ou senha incorretos.";
        case "EMAIL_REQUIRED":
            return "O campo de e-mail é obrigatório.";
        case "INVALID_PASSWORD":
            return "A senha informada é inválida.";
        default:
            return "Ocorreu um erro inesperado. Tente novamente.";
    }
}