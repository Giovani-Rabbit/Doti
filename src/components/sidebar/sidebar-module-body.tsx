import {
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { SidebarModules } from "./sidebar-module"
import SidebarCreateModuleButton from "./buttons/sidebar-create-module-button"

export function SidebarModuleBody() {
    return (
        <nav>
            <SidebarProvider>
                <div className="w-[250px] h-screen border-r flex flex-col">
                    <SidebarGroup>
                        <SidebarGroupLabel>Modules</SidebarGroupLabel>
                        <SidebarGroupAction>
                            <SidebarCreateModuleButton />
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

