import SignupForm from "@/modules/auth/sing-up/components/signup_form";
import { AlarmClockCheckIcon } from "lucide-react";
import Link from "next/link";

export default function SignUp() {
    return (
        <main className="flex min-h-screen flex-col justify-center px-6 py-12">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <AlarmClockCheckIcon className="mx-auto h-14 w-auto p-2 bg-zinc-800 stroke-white rounded-lg" />

                <h2 className="mt-4 text-start text-2xl font-bold tracking-tight text-zinc-800">
                    Criar conta
                </h2>
            </div>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                <SignupForm />

                <p className="mt-10 text-center text-sm/6 text-zinc-600">
                    Já tem uma conta?
                    <Link
                        href="/sign-in"
                        className="ml-1 font-semibold text-zinc-800 hover:text-zinc-500"
                    >
                        Entrar
                    </Link>
                </p>
            </div>
        </main>
    );
}