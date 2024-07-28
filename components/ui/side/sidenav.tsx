import Link from "next/link";
import NavLinks from "./navLinks";

const SideNav = () => {
    return (
        <div className="flex h-full flex-col p-6">
            <Link
                className="h-16 bg-zinc-200 text-lg flex items-start justify-start space-x-4 font-semibold"
                href="/"
            />
            <div className="mt-4 flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md md:block"></div>

            </div>
        </div>
    );
}

export default SideNav;