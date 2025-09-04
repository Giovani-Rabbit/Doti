import { MoreHorizontalIcon, PenLineIcon, TimerResetIcon, Trash2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";


export default function TaskItemKbabMenu() {
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
                <DropdownMenuItem>
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