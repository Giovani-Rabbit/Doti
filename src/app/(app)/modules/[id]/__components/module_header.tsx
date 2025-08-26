import { LucideIcon, LucideIconName } from "@/components/icon/LucideIcon";
import { Button } from "@/components/ui/button";
import InputSearch from "@/components/ui/input-search";
import { Module } from "@/modules/module/module-interface";
import { FilterIcon, PlusIcon } from "lucide-react";

export default function ModuleHeader({ module }: { module: Module }) {
    return (
        <header className="flex flex-col gap-2 items-start justify-center">
            <div className="px-8 flex gap-4 pt-8 pb-2">
                <LucideIcon className="w-8 h-8" name={module?.icon as LucideIconName} />
                <h1 className="text-2xl font-semibold">{module?.name}</h1>
            </div>
            <div className="px-8 pb-2 w-full flex items-center justify-between border-b">
                <InputSearch />
                <div className="flex items-center justify-center gap-2">
                    <Button size={"sm"} variant={"outline"}>
                        <FilterIcon />
                        Filter
                    </Button>
                    <Button size={"sm"}>
                        <PlusIcon />
                        Add Task
                    </Button>
                </div>
            </div>
        </header>
    );
}