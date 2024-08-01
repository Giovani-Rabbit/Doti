import Link from "next/link";
import NavLinks from "./navLinks";

const SideNav = () => {
    return (
        <div className="flex h-full flex-col py-6 px-8">
            <Link
                className="h-16 text-lg flex items-center justify-start space-x-4 font-semibold pb-6 border-b"
                href="/"
            >
                <div className="w-10 h-10 rounded-xl bg-violet-500" />
                <div className="flex flex-col items-start justify-center">
                    <p>Giovani Coelho</p>
                    <p className="text-xs font-medium text-zinc-500">@desenvolvedor</p>
                </div>
            </Link>
            <div className="mt-6 flex grow flex-col justify-between space-y-4">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md md:block"></div>
            </div>
        </div>
    );
}

export default SideNav;