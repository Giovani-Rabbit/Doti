"use client";

import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthenticationFormDTO, signinFormSchema } from "../../interfaces/dto/signin_form_dto";
import { zodResolver } from "@hookform/resolvers/zod";

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
                    <input
                        {...register("email", { required: "Insira um endereço de e-mail" })}
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-600 sm:text-sm/6"
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
                    <input
                        {...register("password", { required: "Insira uma senha" })}
                        type="password"
                        name="password"
                        id="password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-600 sm:text-sm/6"
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