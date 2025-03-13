"use client";

import { signIn } from "next-auth/react";
import { FormEvent } from "react";

const LoginForm = () => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const credentials = {
            email: formData.get("email"),
            password: formData.get("password")
        }

        signIn("credentials", {
            ...credentials,
            callbackUrl: "/"
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
            method="POST"
        >
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-zinc-900"
                >
                    Email
                </label>
                <div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
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
                        type="password"
                        name="password"
                        id="password"
                        required
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

export default LoginForm;