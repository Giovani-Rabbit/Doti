"use client"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { SkullIcon } from "lucide-react"
import { LucideIcon } from "../icon/LucideIcon"
import { moduleOptions } from "@/modules/module/module-query"
import { SidebarModuleSkeleton } from "./skeleton/sidebar-module-skeleton"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import SidebarContextMenu from "./sidebar-module-dropdown"

export function SidebarModules() {
    const { data, isLoading, error } = useQuery(moduleOptions);

    if (isLoading) return <SidebarModuleSkeleton />;
    if (error) return (
        <div className="w-full h-full text-zinc-500 flex flex-col items-center justify-center">
            <SkullIcon />
            <p>Error loading modules.</p>
        </div>
    )

    const modules = data ?? [];

    return (
        <>
            {modules.map(module => (
                <SidebarMenuItem key={module.id} className="group">
                    <SidebarMenuButton asChild>
                        <Link href={`/modules/${module.id}`}>
                            {module.icon && <LucideIcon name={module.icon} />}
                            <span>{module.name}</span>
                        </Link>
                    </SidebarMenuButton>
                    <SidebarContextMenu {...module} key={module.id} />
                </SidebarMenuItem>
            ))}
        </>
    );
}