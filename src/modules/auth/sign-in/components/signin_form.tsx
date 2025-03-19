"use client";

import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthenticationFormDTO, signinFormSchema } from "../../interfaces/dto/signin_form_dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";

export default function SigninForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<AuthenticationFormDTO>({
        resolver: zodResolver(signinFormSchema)
    });

    const onSubmit: SubmitHandler<AuthenticationFormDTO> = useCallback(async (data) => {
        const credentials = {
            email: data.email,
            password: data.password
        };

        const response = await signIn("credentials", {
            ...credentials,
            redirect: false
        });

        if (response?.error == "CredentialsSignin") {
            setError("root", {
                type: "manual",
                message: "e-mail ou senha incorretos."
            });
        }
    }, []);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            {errors.root && (
                <p className="text-sm p-2 px-3 rounded-md bg-red-50 text-red-500 ring-1 ring-red-500">
                    {errors.root?.message}
                </p>
            )}

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-zinc-900"
                >
                    Email
                </label>
                <div>
                    <Input
                        {...register("email", { required: "Insira um endereço de e-mail" })}
                        error={errors.email?.message}
                        type="text"
                        placeholder="Insira seu email"
                        name="email"
                        id="email"
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="password"
                        className="block text-sm/6 font-medium text-zinc-900"
                    >
                        Senha
                    </label>
                    <div className="text-sm">
                        <a
                            href="#"
                            className="font-semibold text-zinc-600 hover:text-zinc-500"
                        >
                            Esqueceu a senha?
                        </a>
                    </div>
                </div>
                <div>
                    <Input
                        {...register("password", { required: "Insira uma senha" })}
                        error={errors.password?.message}
                        placeholder="Insira sua senha"
                        type="password"
                        name="password"
                        id="password"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-zinc-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {
                        isSubmitting
                            ? <LoaderCircle className="animate-spin" />
                            : "Enviar"
                    }
                </button>
            </div>
        </form>
    );
}