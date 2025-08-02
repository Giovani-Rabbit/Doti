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
import { Module } from "@/modules/module/module_interface"
import { Topic } from "@/modules/topic/topic_interface"
import RenameableText from "../ui/renameable-text"
import useRenaming from "@/hooks/useModuleRenaming"
import SidebarMenuButtonMimic from "./buttons/SidebarMenuButtonMimic"
import { LucideIcon } from "../icon/LucideIcon"
import useModuleService from "@/modules/module/module_serivce"
import { useQuery } from "@tanstack/react-query"
import { SidebarModuleSkeleton } from "./skeleton/sidebar-module-skeleton"

export function SidebarModules() {
    const { fetchModules } = useModuleService();

    const { data, isFetching } = useQuery({
        queryKey: ["module"],
        queryFn: fetchModules,
    });

    const modules = data && data.data ? data.data.modules : [];

    if (isFetching) return <SidebarModuleSkeleton />

    return (
        <>
            {modules.map((module) =>
                <SidebarModulesMenu
                    key={module.id}
                    module={module}
                />
            )}
        </>
    );
}

function SidebarModulesMenu({ module }: { module: Module }) {
    const renamingnHook = useRenaming(module.id, module.name);

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