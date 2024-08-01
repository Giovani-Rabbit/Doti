import SideNav from "@/components/ui/side/sidenav";
import { ChartNoAxesColumn, Kanban, List, ListChecks } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64 border-r border-zinc-300">
                <SideNav />
            </div>
            <div className="flex flex-col flex-grow md:overflow-y-auto">
                <div className="w-full h-12 border-b px-4 flex items-center justify-between">
                    <div className="h-full flex items-center justify-start gap-4">
                        <div className="h-full flex items-center gap-2 font-semibold text-violet-600 border-b border-violet-500 hover:border-violet-500">
                            <Kanban />
                            <span>Kanban</span>
                        </div>
                        <div className="h-full flex items-center gap-2 font-semibold text-zinc-400 border-b border-transparent hover:border-violet-500">
                            <ListChecks />
                            <span>Lista</span>
                        </div>
                        <div className="h-full flex items-center gap-2 font-semibold text-zinc-400 border-b border-transparent hover:border-violet-500">
                            <ChartNoAxesColumn />
                            <span>Dashboar</span>
                        </div>
                    </div>
                </div>
                <div className="p-8 flex-grow bg-violet-300/10 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};


export default Layout;