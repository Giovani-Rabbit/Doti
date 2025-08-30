import useTaskProgressStore from "@/modules/task/task-progress-store"
import { calculateRemainingTime } from "@/util/time";
import { TimerIcon } from "lucide-react";

export default function RemainingTime() {
    const sessionTime = useTaskProgressStore(state => state.sessionTime);
    const currentTime = useTaskProgressStore(
        state => state.progress[state.taskInProgress!] ?? 0
    );

    if (!currentTime) return;

    const time = calculateRemainingTime(currentTime, sessionTime);

    return (
        <div className="flex gap-1">
            <TimerIcon size={20} />
            <span className="w-14 font-semibold">
                {time}
            </span>
        </div>
    )
}