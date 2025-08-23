"use client"

import {
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { SkullIcon } from "lucide-react"
import { LucideIcon } from "../icon/LucideIcon"
import { moduleOptions } from "@/modules/module/module-query"
import { SidebarModuleSkeleton } from "./skeleton/sidebar-module-skeleton"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import SidebarContextMenu from "./sidebar-context-menu"

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
                <SidebarContextMenu {...module} key={module.id}>
                    <Link href={`/modules/${module.id}`}>
                        <SidebarMenuButton tooltip={module.name}>
                            {module.icon && <LucideIcon name={module.icon} />}
                            <span>{module.name}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarContextMenu>
            ))}
        </>
    );
}