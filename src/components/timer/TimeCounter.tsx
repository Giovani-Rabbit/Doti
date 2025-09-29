import useTaskProgressStore from "@/modules/task/store/task-progress-store"
import { getFormattedRemainingTime } from "@/util/time";
import { TimerIcon } from "lucide-react";

export default function RemainingTime() {
    const remainingSessionTime = useTaskProgressStore(
        state => getFormattedRemainingTime(
            state.sessionProgress[state.taskInProgress ?? ""],
            state.sessionTime
        )
    );

    if (!remainingSessionTime) return;

    return (
        <div className="flex gap-1">
            <TimerIcon size={20} />
            <span className="w-14 font-semibold">
                {remainingSessionTime}
            </span>
        </div>
    )
}