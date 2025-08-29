"use client";

import { useState } from "react";
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
import { Task } from "@/modules/task/task-interface";
import TaskItem from "@/components/task/task-item";

export default function Tasks({ tasks }: { tasks: Task[] }) {
    const [myTasks, setMyTasks] = useState<Task[]>(tasks);
    const sensors = useSensors(useSensor(PointerSensor));

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setMyTasks((items) => {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);

            if (oldIndex === -1 || newIndex === -1) return items;

            return arrayMove(items, oldIndex, newIndex);
        });
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className="pb-8 grow overflow-auto">
                <ul className="divide-y">
                    <SortableContext items={myTasks} strategy={verticalListSortingStrategy}>
                        {myTasks.map((task) => (
                            <TaskItem task={task} key={task.id} />
                        ))}
                    </SortableContext>
                </ul>
            </div>
        </DndContext>
    );
}
