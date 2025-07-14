"use client"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarProvider,
} from "@/components/ui/sidebar"
import SidebarModules, { Module } from "./sidebar-modules"
import SidebarModuleTopic from "./sidebar-module-topic"
import { SquareTerminal } from "lucide-react"

export function SidebarNav({ modules }: { modules: Module[] }) {
    return (
        <div className="w-[250px] h-screen border-r">
            <SidebarProvider>
                <SidebarGroup>
                    <SidebarGroupLabel>Modules</SidebarGroupLabel>
                    <SidebarMenu>
                        {modules.map((item, idx) => (
                            <SidebarModules key={idx} module={item} />
                        ))}
                        <SidebarModuleTopic topic={{
                            title: "Algebra",
                            url: "#",
                            icon: SquareTerminal,
                        }} />
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarProvider>
        </div>
    )
}
