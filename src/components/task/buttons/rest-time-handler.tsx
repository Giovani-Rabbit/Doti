import useTaskProgressStore from "@/modules/task/task-progress-store";
import { CoffeeIcon } from "lucide-react";

type IRestButton = { taskId: string }

export default function RestTimeHandler({ taskId }: IRestButton) {
    const stopTimer = useTaskProgressStore(state => state.stopTimer);
    const startRestTime = useTaskProgressStore(state => state.startRestTimer);
    const isResting = useTaskProgressStore(state => state.isResting);

    const isRestAvailable = useTaskProgressStore(
        state => state.sessionProgress[taskId] === state.sessionTime
    );

    function handleRestTimer() {
        if (!isResting) startRestTime(taskId)
        else stopTimer();
    }

    if (!isRestAvailable) return;

    return (
        <button onClick={handleRestTimer} className="cursor-pointer rounded-md hover:outline-1">
            <CoffeeIcon className="p-1" />
        </button>
    )
} 