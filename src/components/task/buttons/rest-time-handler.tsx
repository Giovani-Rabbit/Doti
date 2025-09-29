import useTaskProgressStore from "@/modules/task/store/task-progress-store";
import { CoffeeIcon } from "lucide-react";
import { memo } from "react";

type RestTimeHandlerProps = { taskId: string }

function RestTimeHandler({ taskId }: RestTimeHandlerProps) {
    const stopTimer = useTaskProgressStore(state => state.stopTimer);
    const startRestTime = useTaskProgressStore(state => state.startRestTimer);
    const isResting = useTaskProgressStore(state => state.isResting);

    const isRestAvailable = useTaskProgressStore(
        state => state.sessionProgress[taskId] === state.sessionTime
    );

    if (!isRestAvailable) return;

    function handleRestTimer() {
        if (!isResting) startRestTime(taskId);
        else stopTimer();
    }

    return (
        <button
            onClick={handleRestTimer}
            className="rounded-md hover:outline-1"
        >
            <CoffeeIcon className="p-1" />
        </button>
    );
}

export default memo(RestTimeHandler);