"use client";

import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthenticationDTO, authenticationFormSchema } from "../../interfaces/dto/authentication_dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default function SigninForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<AuthenticationDTO>({
        resolver: zodResolver(authenticationFormSchema)
    });

    const onSubmit: SubmitHandler<AuthenticationDTO> = useCallback(async (data) => {
        const response = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        });

        await fetch("/api/auth/set-cookie");

        if (response?.error == "CredentialsSignin") {
            setError("root", {
                type: "manual",
                message: "Incorrect email or password."
            });

            return;
        }

        redirect("/");
    }, [setError]);

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
                <Input
                    {...register("email", { required: "Please enter your email address" })}
                    error={errors.email?.message}
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    id="email"
                />
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="password"
                        className="block text-sm/6 font-medium text-zinc-900"
                    >
                        Password
                    </label>
                    <a
                        href="#"
                        className="text-sm font-semibold text-zinc-600 hover:text-zinc-500"
                    >
                        Forgot your password?
                    </a>
                </div>
                <Input
                    {...register("password", { required: "Please enter your password" })}
                    error={errors.password?.message}
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    id="password"
                />
            </div>

            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-zinc-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                {
                    isSubmitting
                        ? <LoaderCircle className="animate-spin" />
                        : "Sign in"
                }
            </button>
        </form>
    );
}
