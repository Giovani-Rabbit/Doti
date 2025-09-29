import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import useTaskFilterStore, { TaskFilterStatus } from "@/modules/task/store/task-filter-store";
import { ListFilterIcon } from "lucide-react";

export default function TaskFilterButton() {
    const setTaskStatus = useTaskFilterStore(state => state.setTaskStatus);
    const taskStatus = useTaskFilterStore(state => state.taskStatus);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"sm"} variant={"outline"}>
                    <ListFilterIcon />
                    Filter
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                <DropdownMenuLabel>status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={taskStatus}
                    onValueChange={(value) => setTaskStatus(value as TaskFilterStatus)}
                >
                    <DropdownMenuRadioItem value="all">all</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="completed">completed</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="pending">pending</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
