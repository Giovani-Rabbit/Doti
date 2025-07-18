import { z } from "zod";

export interface AuthenticationDTO {
    email: string,
    password: string,
}

export const authenticationFormSchema: z.ZodType<AuthenticationDTO> = z.object({
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(4, "A senha deve conter pelo menos 4 caracteres."),
})
