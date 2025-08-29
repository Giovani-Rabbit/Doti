import { Progress } from "@/components/ui/progress";
import { Task } from "@/modules/task/task-interface";
import useTaskProgressStore from "@/modules/task/task-progress-store";
import { calculateTaskProgressPercentage } from "@/util/time";
import { PauseIcon, PlayIcon } from "lucide-react";

export default function TaskRunner({ task }: { task: Task }) {
    const startTimer = useTaskProgressStore(state => state.startTimer);
    const stopTimer = useTaskProgressStore(state => state.stopTimer);
    const progress = useTaskProgressStore(state => state.progress[task.id] ?? 0);

    const sessionTimePercentage = useTaskProgressStore(state =>
        calculateTaskProgressPercentage(progress, state.sessionTime)
    );

    const isCurrentTaskRunning = useTaskProgressStore(
        state => state.isRunning && state.taskInProgress === task.id
    );

    function handleTimer() {
        if (isCurrentTaskRunning) stopTimer();
        else startTimer(task.id);
    }

    return (
        <div className="flex items-center justify-center gap-2">
            <button onClick={handleTimer} className="cursor-pointer">
                {isCurrentTaskRunning ?
                    <PauseIcon className="p-1" /> :
                    <PlayIcon className="p-1" />
                }
            </button>
            <Progress value={sessionTimePercentage} className="w-20" />
        </div>
    );
}