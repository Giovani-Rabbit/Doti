import { MoreHorizontalIcon, PenLineIcon, TimerResetIcon, Trash2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import useTaskProgressStore from "@/modules/task/store/task-progress-store";
import { useDeleteTaskMut } from "@/modules/task/task-query";
import RenameTaskDialog from "../dialog/rename-task-dialog";
import { useCallback, useState } from "react";
import { Task } from "@/modules/task/task-interface";

export default function TaskItemKbabMenu({ task, moduleId }: { task: Task, moduleId: number }) {
    const [isRenaming, setIsRenaming] = useState<boolean>(false);

    const restartTimer = useTaskProgressStore(state => state.restartTimer);
    const deleteTaskMutation = useDeleteTaskMut(moduleId);

    const handleRestartTimer = useCallback(() => {
        restartTimer(task.id)
    }, [restartTimer, task]);

    const handleDeleteTask = useCallback(() => {
        deleteTaskMutation.mutate(task.id)
    }, [deleteTaskMutation, task]);

    return (
        <>
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
                    <DropdownMenuItem onSelect={() => setIsRenaming(!isRenaming)}>
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

            <RenameTaskDialog
                isOpen={isRenaming}
                setIsOpen={setIsRenaming}
                task={{ id: task.id, name: task.name }}
                moduleId={moduleId}
            />
        </>
    );
}