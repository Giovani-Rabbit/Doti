"use client";

import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthenticationFormDTO, signinFormSchema } from "../../interfaces/dto/signin_form_dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

export default function SigninForm() {
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors }
    } = useForm<AuthenticationFormDTO>({
        resolver: zodResolver(signinFormSchema)
    });

    const onSubmit: SubmitHandler<AuthenticationFormDTO> = useCallback(() => {
        console.log("A");
    }, []);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            {errors && <p className="text-red-500">{errors.password?.message}</p>}

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
                        type="email"
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
                    Entrar
                </button>
            </div>
        </form>
    );
}