import { SidebarProvider } from "../ui/sidebar";
import { SidebarModuleBody } from "./sidebar-module-body";
import SidebarNav from "./sidebar-nav";

export default function SideberBody({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full h-screen flex">
            <SidebarNav />

            <div className="grow flex">
                <SidebarProvider>

                    <SidebarModuleBody />
                </SidebarProvider>


                <div className="p-8 grow">
                    {children}
                </div>
            </div>
        </div>
    );
}
