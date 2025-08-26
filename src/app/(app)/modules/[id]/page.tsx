"use client";

import { redirect, useParams } from "next/navigation";
import { useModuleById } from "@/modules/module/module-query";
import ModuleHeader from "./__components/module_header";
import Tasks from "./__components/tasks";

export default function ModulePage() {
    const { id } = useParams<{ id: string }>();
    const myModule = useModuleById(id);

    if (!myModule) redirect("/")

    // const { data: tasks, isLoading, error } = useQuery({
    //     queryKey: ["tasks", id],
    //     queryFn: () =>
    //         fetch(`/modules/${id}/tasks`).then((res) => res.json()),
    //     enabled: !!id,
    // });

    // if (isLoading) return <p>Loading tasks...</p>;
    // if (error) return <p>Failed to load tasks.</p>;

    return (
        <div className="h-screen flex flex-col text-800">
            <ModuleHeader module={myModule} />
            <Tasks />
        </div>
    );
}
