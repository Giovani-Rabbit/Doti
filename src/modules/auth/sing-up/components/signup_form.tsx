"use client";

import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateAccountFormDTO, createAccountFormSchema } from "../../interfaces/dto/authentication_dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { LoaderCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import AccountService from "@/services/account/service/account_service";
import { mapUserErrorCodeToMessage } from "@/services/account/domain/user_exceptions";
import { redirect } from "next/navigation";

export default function SignupForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<CreateAccountFormDTO>({
        resolver: zodResolver(createAccountFormSchema)
    });

    const { mutateAsync: handleCreateAccount } = useMutation({
        mutationFn: AccountService().createAccount
    })

    const onSubmit: SubmitHandler<CreateAccountFormDTO> = useCallback(async (formData) => {
        if (formData.password !== formData.confirmPassword) {
            return setError("confirmPassword", {
                message: "As senhas não coincidem. Tente novamente."
            });
        }

        const { error } = await handleCreateAccount({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });

        if (error) {
            return setError("root", {
                type: "manual",
                message: mapUserErrorCodeToMessage(error.status)
            });
        }

        redirect("/api/auth/sign-in");
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
                    {...register("name")}
                    error={errors.name?.message}
                    type="text"
                    placeholder="Insira um nome"
                    name="name"
                    id="name"
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-zinc-800"
                >
                    Email
                </label>
                <Input
                    {...register("email")}
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
                    className={"block text-sm/6 font-medium text-zinc-800"}
                >
                    Senha
                </label>
                <div className="space-y-2">
                    <Input
                        {...register("password")}
                        error={errors.password?.message}
                        placeholder="Crie uma senha"
                        type="password"
                        name="password"
                        id="password"
                    />
                    <Input
                        {...register("confirmPassword")}
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
                className="flex w-full justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-zinc-700"
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