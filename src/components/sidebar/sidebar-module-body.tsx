import {
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarProvider,
} from "@/components/ui/sidebar"
import SidebarModuleEllipsis from "./buttons/sidebar-module-ellipsis-button"
import { SidebarModules } from "./sidebar-module"

export function SidebarModuleBody() {
    return (
        <nav>
            <SidebarProvider>
                <div className="w-[250px] h-screen border-r flex flex-col">
                    <SidebarGroup>
                        <SidebarGroupLabel>Módulos</SidebarGroupLabel>
                        <SidebarGroupAction>
                            <SidebarModuleEllipsis />
                        </SidebarGroupAction>
                    </SidebarGroup>

                    <SidebarMenu className="px-2 flex-grow overflow-y-auto min-h-0">
                        <SidebarModules />
                    </SidebarMenu>
                </div>
            </SidebarProvider>
        </nav>
    )
}

