import { Bell, Tally1Icon } from "lucide-react";
import Separator from "../../widgets/separator";

const HeaderLayout = () => {
    return (
        <>
            <div className="w-full h-16 border-b px-4 flex items-center justify-between">
                <div className="h-full p-4 gap-4 flex items-center justify-start">
                    <span className="font-semibold">My Projects</span>
                    <Separator.SeparatorVertical />
                    <span className="text-sm text-zinc-400">8 tasks</span>
                </div>
                <div className="flex items-center justify-end gap-4">
                    <Bell className="text-zinc-400" />
                    <div className="w-10 h-10 bg-violet-500 rounded-full"></div>
                </div>
            </div>
        </>
    );
}

export default HeaderLayout;