import useTaskProgressStore from "@/modules/task/task-progress-store";
import { PauseIcon, PlayIcon } from "lucide-react";
import { memo } from "react";

type SessionTimeHandlerProps = { taskId: string };

function SessionTimeHandler({ taskId }: SessionTimeHandlerProps) {
    const startTimer = useTaskProgressStore(state => state.startSessionTimer);
    const stopTimer = useTaskProgressStore(state => state.stopTimer);

    const isCurrentTaskRunning = useTaskProgressStore(
        state => state.isSessionRunning && state.taskInProgress === taskId
    );

    function handleSessionTimer() {
        if (isCurrentTaskRunning) stopTimer();
        else startTimer(taskId);
    }

    return (
        <button onClick={handleSessionTimer} className="rounded-md hover:outline-1">
            {isCurrentTaskRunning ?
                <PauseIcon className="p-1" /> :
                <PlayIcon className="p-1" />
            }
        </button>
    )
}

export default memo(SessionTimeHandler);  