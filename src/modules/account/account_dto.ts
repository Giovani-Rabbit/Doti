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
    name: z.string().nonempty("Name cannot be empty."),
    email: z.string().email("Enter a valid email."),
    password: z.string().min(4, "Password must be at least 4 characters long."),
    confirmPassword: z.string()
        .min(4, "Password must be at least 4 characters long.")
        .nonempty("Password confirmation cannot be empty."),
});
