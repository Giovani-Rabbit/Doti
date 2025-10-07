import { Checkbox } from "@/components/ui/checkbox";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVerticalIcon } from "lucide-react";
import { Task } from "@/modules/task/task-interface";
import TaskRunner from "./buttons/task-runner";
import { memo } from "react";
import TaskItemKbabMenu from "./buttons/task-item-Kebab-menu";
import useTaskFilterStore from "@/modules/task/store/task-filter-store";
import { useUpdateTaskCompletionMut } from "@/modules/task/task-query";

function TaskItem({ task }: { task: Task }) {
    const updateTaskCompletionMut = useUpdateTaskCompletionMut(task.module_id);
    const isUsingTaskFilter = useTaskFilterStore(state => state.isUsing);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task.id, disabled: isUsingTaskFilter
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    function handleCheckbox(isComplete: boolean) {
        updateTaskCompletionMut.mutate({ taskId: task.id, isComplete })
    }

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="py-2 w-full flex items-center justify-between group"
        >
            <div className="flex items-center justify-center gap-2">
                {!isUsingTaskFilter ? <GripVerticalIcon
                    {...listeners}
                    className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-400 cursor-grab"
                /> : <span className="w-6" />}
                <Checkbox
                    checked={task.is_completed}
                    onCheckedChange={handleCheckbox}
                />
                <span className="pl-1">{task.name}</span>
            </div>
            <div className="pr-8 flex items-center justify-center gap-4">
                <TaskRunner task={task} />
                <TaskItemKbabMenu
                    moduleId={task.module_id}
                    taskId={task.id}
                />
            </div>
        </li>
    );
}

export default memo(TaskItem);