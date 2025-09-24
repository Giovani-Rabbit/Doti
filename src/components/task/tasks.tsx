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
import { taskOptions, useUpdateTaskPosition } from "@/modules/task/task-query";
import { MovedTaskParams } from "@/modules/task/task-dto";

export default function Tasks({ moduleId }: { moduleId: number }) {
    const { data } = useQuery(taskOptions(moduleId));
    const sensors = useSensors(useSensor(PointerSensor));
    const updateTaskPositionMut = useUpdateTaskPosition(moduleId);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const activeIndex = data.findIndex(item => item.id === active.id);
        const overIndex = data.findIndex(item => item.id === over.id);

        if (activeIndex === -1 || overIndex === -1) return;

        const newTasks = arrayMove(data, activeIndex, overIndex);

        const movedTasks: MovedTaskParams[] = newTasks
            .map((task, index) => ({ id: task.id, position: index }))
            .filter((task, index) => data[index].id != task.id);

        updateTaskPositionMut.mutate({ tasks: newTasks, movedTasks })
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
