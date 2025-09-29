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
import { useEffect, useMemo } from "react";
import useTaskFilterStore from "@/modules/task/store/task-filter-store";

export default function Tasks({ moduleId }: { moduleId: number }) {
    const { data } = useQuery(taskOptions(moduleId));
    const sensors = useSensors(useSensor(PointerSensor));
    const updateTaskPositionMut = useUpdateTaskPosition(moduleId);

    const searchTaskValue = useTaskFilterStore(state => state.searchTaskValue);
    const searchTask = useTaskFilterStore(state => state.SearchTask);

    useEffect(() => { searchTaskValue != "" && searchTask("") }, []);

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

    const taskFilter = useMemo(() => {
        return data
            .filter(task => task.name.toLowerCase().includes(searchTaskValue));
    }, [data, searchTaskValue]);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className="pb-8 grow overflow-auto">
                <ul className="divide-y">
                    <SortableContext
                        items={taskFilter.map(task => task.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {taskFilter.map((task) => (
                            <TaskItem task={task} key={task.id} />
                        ))}
                    </SortableContext>
                </ul>
            </div>
        </DndContext>
    );
}
