import useTaskProgressStore from "@/modules/task/task-progress-store"
import { calculateRemainingTime, formatTime } from "@/util/time";
import { TimerIcon } from "lucide-react";

export default function RemainingTime() {
    const remainingTime = useTaskProgressStore(
        state => calculateRemainingTime(
            state.sessionProgress[state.taskInProgress ?? ""],
            state.sessionTime
        )
    );

    if (!remainingTime) return;

    const time = formatTime(remainingTime);

    return (
        <div className="flex gap-1">
            <TimerIcon size={20} />
            <span className="w-14 font-semibold">
                {time}
            </span>
        </div>
    )
}