import useTaskProgressStore from "@/modules/task/task-progress-store";
import { calculateRemainingTime, formatTime } from "@/util/time";
import { CoffeeIcon } from "lucide-react";

export default function RestTimer() {
    const remainingRestTime = useTaskProgressStore(state =>
        calculateRemainingTime(
            state.restProgress,
            state.restTime
        )
    );

    const isResting = useTaskProgressStore(state => state.isResting);

    if (!isResting) return;

    const restTime = formatTime(remainingRestTime);

    return (
        <div className="flex gap-1">
            <CoffeeIcon size={20} />
            <span className="w-14 font-semibold">
                {restTime}
            </span>
        </div>
    )
}