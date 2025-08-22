import { LucideIcon, LucideIconName } from "@/components/icon/LucideIcon";
import { Module } from "@/modules/module/module-interface";
import { EllipsisIcon } from "lucide-react";

export default function ModuleHeader({ module }: { module: Module | undefined }) {
    return (
        <header className="flex gap-2 items-center justify-between">
            <div className="flex gap-2">
                <LucideIcon name={module?.icon as LucideIconName} />
                <h1 className="text-xl">{module?.name}</h1>
            </div>
            <EllipsisIcon className="w-5 text-zinc-800" />
        </header>
    )
}