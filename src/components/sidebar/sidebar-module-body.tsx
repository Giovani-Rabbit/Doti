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
        <SidebarProvider>
            <SidebarGroup className="w-[250px] h-screen border-r overflow-y-auto">
                <SidebarGroupLabel>Módulos</SidebarGroupLabel>
                <SidebarGroupAction>
                    <SidebarModuleEllipsis />
                </SidebarGroupAction>
                <SidebarMenu className="flex-grow overflow-y-auto">
                    <SidebarModules />
                </SidebarMenu>
            </SidebarGroup>
        </SidebarProvider >
    )
}

