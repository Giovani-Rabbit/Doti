"use client"

import { LucideIcon, LucideIconName } from "@/components/icon/LucideIcon";
import { Button } from "@/components/ui/button";
import InputSearch from "@/components/ui/input-search";
import { useModuleById } from "@/modules/module/module-query";
import useTaskProgressStore from "@/modules/task/task-progress-store";
import { ListFilterIcon, PlusIcon } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";

export default function ModuleHeader() {
    const { id } = useParams<{ id: string }>();
    const myModule = useModuleById(id);
    const setSessionTime = useTaskProgressStore(state => state.setSessionTime);

    if (!myModule) redirect("/");

    useEffect(() => {
        if (myModule && myModule.sessionTime) {
            setSessionTime(myModule.sessionTime);
        }
    }, [myModule]);

    return (
        <header className="flex flex-col gap-2 items-start justify-center">
            <div className="w-full px-8 flex flex-col gap-1 pt-8 pb-2">
                <div className="w-full flex items-center justify-start gap-2">
                    <LucideIcon width={30} name={myModule.icon as LucideIconName} />
                    <h1 className="text-2xl font-semibold">{myModule.name}</h1>
                </div>
                <span className="w-full px-10 text-xs text-zinc-500">Last Session February 28, 2025</span>
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