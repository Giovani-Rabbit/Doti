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

export default function Tasks() {
    const [arr, setArr] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);

    const sensors = useSensors(useSensor(PointerSensor));

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setArr((items) => {
            const oldIndex = items.indexOf(active.id as number);
            const newIndex = items.indexOf(over.id as number);
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
                    <SortableContext items={arr} strategy={verticalListSortingStrategy}>
                        {arr.map((num) => (
                            <TaskItem id={num} key={num} />
                        ))}
                    </SortableContext>
                </ul>
            </div>
        </DndContext>
    );
}
