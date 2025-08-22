import { LucideIcon, LucideIconName } from "@/components/icon/LucideIcon";
import { Module } from "@/modules/module/module-interface";

export default function ModuleHeader({ module }: { module: Module }) {
    return (
        <header className="flex gap-2 items-center justify-between">
            <div className="flex gap-2">
                <LucideIcon name={module?.icon as LucideIconName} />
                <h1 className="text-xl">{module?.name}</h1>
            </div>
        </header>
    )
}