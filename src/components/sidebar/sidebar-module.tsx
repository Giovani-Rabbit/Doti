"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { ChevronRight, LucideIcon } from "lucide-react"

export type Module = {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    topics?: Topic[]
}

export type Topic = {
    title: string,
    url: string,
    icon?: LucideIcon
};

export function SidebarModule({ modules }: { modules: Module[] }) {
    return (
        <div className="w-[250px] h-screen border-r">
            <SidebarProvider>
                <SidebarGroup>
                    <SidebarGroupLabel>Modules</SidebarGroupLabel>
                    <SidebarMenu>
                        {modules.map((module) => {
                            return (
                                <Collapsible
                                    key={module.title}
                                    asChild
                                    defaultOpen={module.isActive}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={module.title}>
                                                {module.icon && <module.icon />}
                                                <span>{module.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {module.topics?.map((topic) => (
                                                    <SidebarMenuSubItem key={topic.title}>
                                                        <SidebarMenuSubButton asChild>
                                                            <a href={topic.url}>
                                                                {topic.icon && <topic.icon />}
                                                                <span>{topic.title}</span>
                                                            </a>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarProvider>
        </div>
    )
}
