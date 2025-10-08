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
import { taskOptions, useUpdateTaskPositionMut } from "@/modules/task/task-query";
import { MovedTaskParams } from "@/modules/task/task-dto";
import { useEffect, useMemo } from "react";
import useTaskFilterStore from "@/modules/task/store/task-filter-store";

export default function Tasks({ moduleId }: { moduleId: number }) {
    const { data } = useQuery(taskOptions(moduleId));
    const sensors = useSensors(useSensor(PointerSensor));
    const updateTaskPositionMut = useUpdateTaskPositionMut(moduleId);

    const searchTaskValue = useTaskFilterStore(state => state.searchValue);
    const filterTaskStatus = useTaskFilterStore(state => state.taskStatus);
    const setSearchValue = useTaskFilterStore(state => state.setSearchValue);
    const setShowCompleted = useTaskFilterStore(state => state.setTaskStatus);

    useEffect(() => {
        if (searchTaskValue != "") setSearchValue("");
        if (filterTaskStatus != "all") setShowCompleted("all");
    }, []);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const activeIndex = data.findIndex(item => item.id === active.id);
        const overIndex = data.findIndex(item => item.id === over.id);

        if (activeIndex === -1 || overIndex === -1) return;

        const newTasks = arrayMove(data, activeIndex, overIndex)

        const minIndex = Math.min(activeIndex, overIndex);
        const maxIndex = Math.max(activeIndex, overIndex);

        // Update positions only for the entire list (necessary for consistency, but efficient for small lists)
        newTasks.forEach((task, idx) => task.position = idx);

        const movedTasks: MovedTaskParams[] = [];
        for (let i = minIndex; i <= maxIndex; i++) {
            const task = newTasks[i];
            movedTasks.push({ id: task.id, position: i });
        }

        updateTaskPositionMut.mutate({ tasks: newTasks, movedTasks })
    }

    const taskFilter = useMemo(() => {
        return data
            .filter(task => task.name.toLowerCase().includes(searchTaskValue))
            .filter(task => {
                if (filterTaskStatus === "all") return true;
                if (filterTaskStatus === "completed") return task.is_completed;
                if (filterTaskStatus === "pending") return !task.is_completed;
            })
    }, [data, searchTaskValue, filterTaskStatus]);

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
