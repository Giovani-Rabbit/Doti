import { Progress } from "@/components/ui/progress";
import { Task } from "@/modules/task/task-interface";
import useTaskProgressStore from "@/modules/task/task-progress-store";
import { calculateTaskProgressPercentage } from "@/util/time";
import { CoffeeIcon, PauseIcon, PlayIcon } from "lucide-react";

export default function TaskRunner({ task }: { task: Task }) {
    const startTimer = useTaskProgressStore(state => state.startTimer);
    const stopTimer = useTaskProgressStore(state => state.stopTimer);

    const sessionTimePercentage = useTaskProgressStore(state =>
        calculateTaskProgressPercentage(
            state.sessionProgress[task.id] ?? 0, state.sessionTime
        )
    );

    const isCurrentTaskRunning = useTaskProgressStore(
        state => state.isSessionRunning && state.taskInProgress === task.id
    );

    const isRestAvailable = useTaskProgressStore(
        state => state.sessionProgress[task.id] === state.sessionTime
    );

    function handleTimer() {
        if (isCurrentTaskRunning) stopTimer();
        else startTimer(task.id);
    }

    return (
        <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
                {isRestAvailable &&
                    <button onClick={handleTimer} className="cursor-pointer rounded-md hover:outline-1">
                        <CoffeeIcon className="p-1" />
                    </button>
                }
                <button onClick={handleTimer} className="cursor-pointer rounded-md hover:outline-1">
                    {isCurrentTaskRunning ?
                        <PauseIcon className="p-1" /> :
                        <PlayIcon className="p-1" />
                    }
                </button>
            </div>
            <Progress value={sessionTimePercentage} className="w-20" />
        </div>
    );
}