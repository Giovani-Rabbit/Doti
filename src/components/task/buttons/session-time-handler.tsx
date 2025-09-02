import useTaskProgressStore from "@/modules/task/task-progress-store";
import { PauseIcon, PlayIcon } from "lucide-react";

type ISessionTimeHandler = { taskId: string };

export default function SessionTimeHandler({ taskId }: ISessionTimeHandler) {
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
        <button onClick={handleSessionTimer} className="cursor-pointer rounded-md hover:outline-1">
            {isCurrentTaskRunning ?
                <PauseIcon className="p-1" /> :
                <PlayIcon className="p-1" />
            }
        </button>
    )
}