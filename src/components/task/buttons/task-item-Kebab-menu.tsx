import { MoreHorizontalIcon, PenLineIcon, TimerResetIcon, Trash2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import useTaskProgressStore from "@/modules/task/store/task-progress-store";


export default function TaskItemKbabMenu({ taskId }: { taskId: number }) {
    const restartTimer = useTaskProgressStore(state => state.restartTimer);

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
                <DropdownMenuItem onSelect={() => restartTimer(taskId.toString())}>
                    <TimerResetIcon />
                    <span>Restart</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <PenLineIcon />
                    <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    variant="destructive"
                >
                    <Trash2Icon />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}