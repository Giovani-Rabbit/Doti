import Link from "next/link";
import NavLinks from "./navLinks";
import { AlarmClockCheck, LogOut, Settings } from "lucide-react";
import Separator from "../../../components/ui/widgets/separator";

const SideNav = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center py-3">
            <Link
                className="h-16 text-lg flex items-center justify-start font-semibold pb-6"
                href="/"
            >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500">
                    <AlarmClockCheck className="text-white" />
                </div>
            </Link>
            <div className="mt-6 flex grow flex-col justify-between space-y-4">
                <NavLinks />

                <div className="hidden h-auto w-full grow rounded-md md:block" />

                <div className="py-4 flex flex-col items-center justify-center gap-4">
                    <Link className="p-2 rounded-lg text-zinc-400 hover:text-violet-500 hover:bg-violet-50" href="/config">
                        <Settings />
                    </Link>
                    <Separator.SeparatorHorizontal />
                    <Link className="p-2 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50" href="/">
                        <LogOut />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SideNav;