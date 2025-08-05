"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRight } from "lucide-react"
import SidebarModuleContextMenu from "./sidebar-module-context-menu"
import { Module } from "@/modules/module/module-interface"
import { Topic } from "@/modules/topic/topic_interface"
import RenameableText from "../ui/renameable-text"
import SidebarMenuButtonMimic from "./buttons/SidebarMenuButtonMimic"
import { LucideIcon } from "../icon/LucideIcon"
import { moduleOptions } from "@/modules/module/module-query"
import { SidebarModuleSkeleton } from "./skeleton/sidebar-module-skeleton"
import { useQuery } from "@tanstack/react-query"
import { useModuleRenaming } from "@/hooks/useModuleRenaming"

export function SidebarModules() {
    const { data, isLoading, error } = useQuery(moduleOptions);

    // TODO: Adicionar feedback de erro

    if (isLoading) return <SidebarModuleSkeleton />;
    if (error) return <p>Error loading modules.</p>;

    const modules = data ?? [];

    return (
        <>
            {modules.map(module => (
                <SidebarModulesMenu key={module.id} module={module} />
            ))}
        </>
    );
}

function SidebarModulesMenu({ module }: { module: Module }) {
    const renamingnHook = useModuleRenaming(module.id, module.name);

    const sidebarButtonContent = (
        <>
            {module.icon && <LucideIcon name={module.icon} />}
            <RenameableText {...renamingnHook} />
            {module.topics && module.topics.length > 0 && (
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            )}
        </>
    )

    return (
        <Collapsible
            key={module.id}
            asChild
            defaultOpen={module.isOpen}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <SidebarModuleContextMenu {...renamingnHook}>
                    {renamingnHook.isRenaming ? (
                        <SidebarMenuButtonMimic>
                            {sidebarButtonContent}
                        </SidebarMenuButtonMimic>
                    ) : (
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={module.name}>
                                {sidebarButtonContent}
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                    )}
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