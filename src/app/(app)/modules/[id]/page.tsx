"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function ModulePage() {
    const { id } = useParams<{ id: string }>();

    const { data: tasks, isLoading, error } = useQuery({
        queryKey: ["tasks", id],
        queryFn: () =>
            fetch(`/modules/${id}/tasks`).then((res) => res.json()),
        enabled: !!id,
    });

    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>Failed to load tasks.</p>;

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Tasks for Module {id}</h1>
            <ul className="space-y-1">
                {tasks?.map((t: any) => (
                    <li key={t.id}>{t.title}</li>
                ))}
            </ul>
        </div>
    );
}
