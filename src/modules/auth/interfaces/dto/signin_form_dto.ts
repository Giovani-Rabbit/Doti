import { z } from "zod";

export interface AuthenticationFormDTO {
    email: string,
    password: string,
    confirmPassword?: string
}

export const signinFormSchema: z.ZodType<AuthenticationFormDTO> = z.object({
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(4, "A senha deve conter pelo menos 4 caracteres."),
    confirmPassword: z.string().min(4, "A senha deve conter pelo menos 4 caracteres.").optional()
});