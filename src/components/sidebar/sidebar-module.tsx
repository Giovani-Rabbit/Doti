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
import { ChevronRight, Ellipsis, FolderPlusIcon, LucideIcon } from "lucide-react"
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "../ui/context-menu"
import SidebarModuleContextMenu from "./sidebar-module-context-menu"

export type Module = {
    name: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    topics?: Topic[]
}

export type Topic = {
    name: string,
    url: string,
    icon?: LucideIcon
};

export function SidebarModule({ modules }: { modules: Module[] }) {
    return (
        <div className="w-[250px] h-screen border-r">
            <SidebarProvider>
                <SidebarGroup>
                    <SidebarGroupLabel>Modules</SidebarGroupLabel>
                    <SidebarGroupAction><Ellipsis /></SidebarGroupAction>
                    <SidebarMenu>
                        {modules.map((module) =>
                            <SidebarModulesMenu
                                key={module.name}
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
            key={module.name}
            asChild
            defaultOpen={module.isActive}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <SidebarModuleContextMenu>
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
                <a href={topic.url}>
                    {topic.icon && <topic.icon />}
                    <span>{topic.name}</span>
                </a>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    )
}