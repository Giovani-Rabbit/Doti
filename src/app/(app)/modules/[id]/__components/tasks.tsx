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
import TaskItem from "@/components/task/task-item";
import { Task } from "@/modules/task/task-interface";

const tasks = [
    {
        id: "1",
        name: "Estudar",
        isComplete: false,
        position: 1,
        created_at: "28/08/2025",
        updated_at: "28/08/2025"
    },
    {
        id: "2",
        name: "Estudar",
        isComplete: false,
        position: 2,
        created_at: "28/08/2025",
        updated_at: "28/08/2025"
    },
    {
        id: "3",
        name: "Estudar",
        isComplete: false,
        position: 3,
        created_at: "28/08/2025",
        updated_at: "28/08/2025"
    },
    {
        id: "4",
        name: "Estudar",
        isComplete: false,
        position: 4,
        created_at: "28/08/2025",
        updated_at: "28/08/2025"
    },
    {
        id: "5",
        name: "Estudar",
        isComplete: false,
        position: 5,
        created_at: "28/08/2025",
        updated_at: "28/08/2025"
    }
]

export default function Tasks() {
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
                        {myTasks.map((num) => (
                            <TaskItem id={num.id} key={num.id} />
                        ))}
                    </SortableContext>
                </ul>
            </div>
        </DndContext>
    );
}
