"use client";

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TaskItem from "@/components/task/task-item";
import { useQuery } from "@tanstack/react-query";
import { taskOptions } from "@/modules/task/task-query";

export default function Tasks({ moduleId }: { moduleId: number }) {
    const { data } = useQuery(taskOptions(moduleId));
    const sensors = useSensors(useSensor(PointerSensor));

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = data.findIndex(item => item.id === active.id);
        const newIndex = data.findIndex(item => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        const newTasks = arrayMove(data, oldIndex, newIndex);
        // mutation.mutate({ moduleId, tasks: newTasks });
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className="pb-8 grow overflow-auto">
                <ul className="divide-y">
                    <SortableContext items={data} strategy={verticalListSortingStrategy}>
                        {data.map((task) => (
                            <TaskItem task={task} key={task.id} />
                        ))}
                    </SortableContext>
                </ul>
            </div>
        </DndContext>
    );
}
