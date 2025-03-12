import { AlarmClockCheckIcon } from "lucide-react";

export default function Login() {
    return (
        <main className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <AlarmClockCheckIcon className="mx-auto h-14 w-auto p-2 bg-zinc-900 stroke-white rounded-lg" />

                <h2 className="mt-4 text-start text-2xl font-bold tracking-tight text-zinc-900">
                    Login
                </h2>
            </div>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    className="space-y-6"
                    action="#"
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
                                autoComplete="email"
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
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-600 sm:text-sm/6" />
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

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Não tem uma conta?
                    <a
                        href="#"
                        className="ml-1 font-semibold text-zinc-700 hover:text-zinc-500"
                    >
                        Criar uma conta
                    </a>
                </p>
            </div>
        </main>
    );
}
