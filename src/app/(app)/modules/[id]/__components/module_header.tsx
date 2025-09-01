"use client"

import { LucideIcon, LucideIconName } from "@/components/icon/LucideIcon";
import RemainingTime from "@/components/timer/TimeCounter";
import { Button } from "@/components/ui/button";
import InputSearch from "@/components/ui/input-search";
import { useModuleById } from "@/modules/module/module-query";
import { ListFilterIcon, PlusIcon } from "lucide-react";
import { redirect, useParams } from "next/navigation";

export default function ModuleHeader() {
    const { id } = useParams<{ id: string }>();
    const myModule = useModuleById(id);

    if (!myModule) redirect("/");

    return (
        <header className="flex flex-col gap-2 items-start justify-center">
            <div className="w-full px-8 flex flex-col gap-1 pt-8 pb-2">
                <div className="w-full flex items-center justify-between gap-2">
                    <div className="w-full flex items-center justify-start">
                        <LucideIcon width={30} name={myModule.icon as LucideIconName} />
                        <h1 className="text-2xl font-semibold">{myModule.name}</h1>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <RemainingTime />
                    </div>
                </div>
                <span className="w-full px-8 text-xs text-zinc-500">Last Session February 28, 2025</span>
            </div>
            <div className="px-8 pb-2 w-full flex items-center justify-between border-b">
                <InputSearch />
                <div className="flex items-center justify-center gap-2">
                    <Button size={"sm"} variant={"outline"}>
                        <ListFilterIcon />
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