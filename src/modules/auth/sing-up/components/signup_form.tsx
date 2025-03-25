"use client";

import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountFormDTO, createAccountFormSchema } from "../../interfaces/dto/authentication_dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { LoaderCircle } from "lucide-react";

export default function SignupForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<AccountFormDTO>({
        resolver: zodResolver(createAccountFormSchema)
    });

    const onSubmit: SubmitHandler<AccountFormDTO> = useCallback(async (data) => {

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
                    htmlFor="name"
                    className="block text-sm/6 font-medium text-zinc-900"
                >
                    Nome
                </label>
                <Input
                    {...register("name", { required: "Insira um nome de usuário" })}
                    error={errors.email?.message}
                    type="text"
                    placeholder="Insira um nome"
                    name="name"
                    id="name"
                />
            </div>


            <div>
                <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-zinc-900"
                >
                    Email
                </label>
                <Input
                    {...register("email", { required: "Insira um endereço de e-mail" })}
                    error={errors.email?.message}
                    type="text"
                    placeholder="Insira seu email"
                    name="email"
                    id="email"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-zinc-900"
                >
                    Senha
                </label>
                <div className="space-y-2">
                    <Input
                        {...register("password", { required: "Insira uma senha" })}
                        error={errors.password?.message}
                        placeholder="Crie uma senha"
                        type="password"
                        name="password"
                        id="password"
                    />
                    <Input
                        {...register("confirmPassword", { required: "Confirme uma senha" })}
                        error={errors.confirmPassword?.message}
                        placeholder="Confirme a senha"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-zinc-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                {
                    isSubmitting
                        ? <LoaderCircle className="animate-spin" />
                        : "Criar"
                }
            </button>
        </form>
    );
}