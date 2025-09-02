import useTaskProgressStore from "@/modules/task/task-progress-store"
import { calculateRemainingTime, formatTime } from "@/util/time";
import { TimerIcon } from "lucide-react";

export default function RemainingTime() {
    const remainingSessionTime = useTaskProgressStore(
        state => calculateRemainingTime(
            state.sessionProgress[state.taskInProgress ?? ""],
            state.sessionTime
        )
    );

    if (!remainingSessionTime) return;

    const sessionTime = formatTime(remainingSessionTime);

    return (
        <div className="flex gap-1">
            <TimerIcon size={20} />
            <span className="w-14 font-semibold">
                {sessionTime}
            </span>
        </div>
    )
}