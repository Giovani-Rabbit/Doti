import { z } from "zod";

export interface AuthenticationFormDTO {
    email: string,
    password: string
}

export const signinFormSchema: z.ZodType<AuthenticationFormDTO> = z.object({
    email: z.string().email(),
    password: z.string().min(4, "A senha deve conter pelo menos 4 caracteres.")
});