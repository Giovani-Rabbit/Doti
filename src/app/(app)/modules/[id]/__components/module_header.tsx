"use client"

import { LucideIcon, LucideIconName } from "@/components/icon/LucideIcon";
import CreateTaskButton from "@/components/task/buttons/create-task";
import TaskFilterButton from "@/components/task/buttons/task-filter.button";
import RestTimer from "@/components/timer/restTimer";
import RemainingTime from "@/components/timer/TimeCounter";
import InputSearch from "@/components/ui/input-search";
import { useModuleById } from "@/modules/module/module-query";
import { redirect, useParams } from "next/navigation";

export default function ModuleHeader() {
    const { id } = useParams<{ id: string }>();
    const { data } = useModuleById(id);

    if (!data) redirect("/");

    return (
        <header className="flex flex-col gap-2 items-start justify-center">
            <div className="w-full px-8 flex flex-col gap-1 pt-8 pb-2">
                <div className="w-full flex items-center justify-between gap-2">
                    <div className="w-full flex items-center justify-start gap-1">
                        <LucideIcon width={30} name={data?.icon as LucideIconName} />
                        <h1 className="text-2xl font-semibold">{data.name}</h1>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <RestTimer />
                        <RemainingTime />
                    </div>
                </div>
                <span className="w-full px-8 text-xs text-zinc-500">Last Session February 28, 2025</span>
            </div>
            <div className="px-8 pb-2 w-full flex items-center justify-between border-b">
                <InputSearch />
                <div className="flex items-center justify-center gap-2">
                    <TaskFilterButton />
                    <CreateTaskButton />
                </div>
            </div>
        </header>
    );
}