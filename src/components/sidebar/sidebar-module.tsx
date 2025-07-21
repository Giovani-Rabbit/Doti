"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import {
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { ChevronRight } from "lucide-react"
import SidebarModuleContextMenu from "./sidebar-module-context-menu"
import SidebarModuleEllipsis from "./buttons/sidebar-module-ellipsis-button"
import { useModuleStore } from "@/modules/module/module_store"
import { Module } from "@/modules/module/module_interface"
import { Topic } from "@/modules/topic/topic_interface"

export function SidebarModule() {
    const { modules } = useModuleStore();

    return (
        <div className="w-[250px] h-screen border-r">
            <SidebarProvider>
                <SidebarGroup>
                    <SidebarGroupLabel>Módulos</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <SidebarModuleEllipsis />
                    </SidebarGroupAction>
                    <SidebarMenu>
                        {modules.map((module) =>
                            <SidebarModulesMenu
                                key={module.id}
                                module={module}
                            />
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarProvider>
        </div>
    )
}

function SidebarModulesMenu({ module }: { module: Module }) {
    return (
        <Collapsible
            key={module.id}
            asChild
            defaultOpen={module.isOpen}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <SidebarModuleContextMenu targetModule={module}>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={module.name}>
                            {module.icon && <module.icon />}

                            <span>{module.name}</span>

                            {module.topics && module.topics.length > 0 && (
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            )}
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                </SidebarModuleContextMenu>

                <CollapsibleContent>
                    <SidebarMenuSub>
                        {module.topics && module.topics.map((topic) => (
                            <SidebarTopicSubMenu key={topic.name} topic={topic} />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible >
    )
}

function SidebarTopicSubMenu({ topic }: { topic: Topic }) {
    return (
        <SidebarMenuSubItem key={topic.name}>
            <SidebarMenuSubButton asChild>
                <a href={"#"}>
                    {topic.icon && <topic.icon />}
                    <span>{topic.name}</span>
                </a>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    )
}