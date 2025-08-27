import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskItem from '@/components/task/task-item';
import { DndContext } from '@dnd-kit/core';
import { useState } from "react";

export default function Tasks() {
    const [arr] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);

    return (
        <DndContext>
            <div className="pb-8 grow overflow-auto">
                <ul className="divide-y">
                    <SortableContext
                        items={arr}
                        strategy={verticalListSortingStrategy}
                    >
                        {arr.map((num, idx) => (
                            <TaskItem id={num} key={idx} />
                        ))}
                    </SortableContext>
                </ul>
            </div>
        </DndContext>
    )
}
