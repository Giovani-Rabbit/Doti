import { Progress } from "@/components/ui/progress";
import { Task } from "@/modules/task/task-interface";
import useTaskProgressStore from "@/modules/task/store/task-progress-store";
import { calculateTaskProgressPercentage } from "@/util/time";
import RestTimeHandler from "./rest-time-handler";
import SessionTimeHandler from "./session-time-handler";

type TaskRunnerProps = { task: Task };

export default function TaskRunner({ task }: TaskRunnerProps) {
    const sessionTimePercentage = useTaskProgressStore(state =>
        calculateTaskProgressPercentage(
            state.sessionProgress[task.id] ?? 0,
            state.sessionTime
        )
    );

    return (
        <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
                <RestTimeHandler taskId={task.id} />
                <SessionTimeHandler taskId={task.id} />
            </div>
            <Progress value={sessionTimePercentage} className="w-24" />
        </div>
    );
}