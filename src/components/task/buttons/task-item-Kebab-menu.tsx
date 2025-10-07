import { MoreHorizontalIcon, PenLineIcon, TimerResetIcon, Trash2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import useTaskProgressStore from "@/modules/task/store/task-progress-store";
import { useDeleteTaskMut } from "@/modules/task/task-query";

export default function TaskItemKbabMenu({ taskId, moduleId }: { taskId: number, moduleId: number }) {
    const restartTimer = useTaskProgressStore(state => state.restartTimer);
    const deleteTaskMutation = useDeleteTaskMut(moduleId);

    const handleRestartTimer = () => restartTimer(taskId);
    const handleDeleteTask = () => deleteTaskMutation.mutate(taskId);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button>
                    <MoreHorizontalIcon
                        size={20}
                        className="group-hover:opacity-100 text-zinc-500"
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30" align="start">
                <DropdownMenuItem onSelect={handleRestartTimer}>
                    <TimerResetIcon />
                    <span>Restart</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <PenLineIcon />
                    <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onSelect={handleDeleteTask}
                    variant="destructive"
                >
                    <Trash2Icon />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}