"use client";

import { useParams } from "next/navigation";
import { useModuleById } from "@/modules/module/module-query";
import ModuleHeader from "./__components/module_header";

export default function ModulePage() {
    const { id } = useParams<{ id: string }>();
    const module = useModuleById(id);

    // const { data: tasks, isLoading, error } = useQuery({
    //     queryKey: ["tasks", id],
    //     queryFn: () =>
    //         fetch(`/modules/${id}/tasks`).then((res) => res.json()),
    //     enabled: !!id,
    // });

    // if (isLoading) return <p>Loading tasks...</p>;
    // if (error) return <p>Failed to load tasks.</p>;

    return (
        <div className="h-full flex items-start justify-center p-8 text-800">
            <div className="w-[95%]">
                <ModuleHeader module={module} />
            </div>
        </div>
    );
}
