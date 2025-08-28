import { Checkbox } from "@/components/ui/checkbox";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVerticalIcon, MoreHorizontalIcon, PlayIcon } from "lucide-react";
import { Progress } from "../ui/progress";
import useTaskProgressStore from "@/modules/task/task-progress-store";

export default function TaskItem({ id }: { id: string }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const { startTimer, stopTimer } = useTaskProgressStore();
    const progress = useTaskProgressStore(state => state.progress[id] ?? 0);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="py-2 w-full flex items-center justify-between group"
        >
            <div className="flex items-center justify-center gap-2">
                <GripVerticalIcon
                    {...listeners}
                    className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-400 cursor-grab"
                />
                <Checkbox />
                <span className="pl-1">Nome da tarefa {id}</span>
            </div>
            <div className="pr-8 flex items-center justify-center gap-4">
                <div className="flex items-center justify-center gap-2">
                    <button onClick={() => startTimer(id)}>
                        <PlayIcon className="p-1" />
                    </button>
                    <Progress value={progress} className="w-20" />
                </div>
                <button onClick={stopTimer}>
                    <MoreHorizontalIcon
                        size={20}
                        className="group-hover:opacity-100 text-zinc-500"
                    />
                </button>
            </div>
        </li>
    );
}
