import { z } from "zod";

export interface AccountDTO {
    name: string,
    email: string,
    password: string
}

export interface CreateAccountFormDTO {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export const createAccountFormSchema: z.ZodType<CreateAccountFormDTO> = z.object({
    name: z.string().nonempty("O nome não pode estar vazio."),
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(4, "A senha deve conter pelo menos 4 caracteres."),
    confirmPassword: z.string()
        .min(4, "A senha deve conter pelo menos 4 caracteres.")
        .nonempty("A confirmação de senha não pode estar vazia."),
});