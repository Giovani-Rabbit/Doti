import { Checkbox } from "@/components/ui/checkbox";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVerticalIcon, MoreHorizontalIcon, PlayIcon } from "lucide-react";
import { Progress } from "../ui/progress";

export default function TaskItem({ id }: { id: number }) {
    const {
        attributes, listeners, setNodeRef, transform, transition
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="py-2 w-full flex items-center justify-between group"
        >
            <div className="flex items-center justify-center gap-2">
                <GripVerticalIcon className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-400 cursor-grab" />
                <Checkbox />
                <span className="pl-1">Nome da tarefa {id}</span>
            </div>
            <div className="pr-8 flex items-center justify-center gap-4">
                <div className="flex items-center justify-center gap-2">
                    <button>
                        <PlayIcon className="p-1" />
                    </button>
                    <Progress value={59.9} className="w-20" />
                </div>
                <button>
                    <MoreHorizontalIcon
                        size={20}
                        className="group-hover:opacity-100 text-zinc-500"
                    />
                </button>
            </div>
        </li>
    );
}
