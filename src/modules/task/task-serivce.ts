import HttpService from "@/util/http/http_service";
import { CreateTaskDTO, MovedTaskParams, UpdateTaskPositionDTO } from "./task-dto";
import { Task } from "./task-interface";

const httpService = new HttpService("tasks");

export async function createTask(task: CreateTaskDTO) {
    const res = await httpService.post<
        CreateTaskDTO, Task
    >({
        url: "/",
        data: task,
    });

    if (res.error != null) {
        throw new Error(res.error.message);
    }

    return res.data;
}

type MovedTaskRequest = { movedTasks: MovedTaskParams[] }

export async function updataTaskPosition(tasks: UpdateTaskPositionDTO) {
    const res = await httpService.patch<MovedTaskRequest, null>({
        url: "/",
        data: { movedTasks: tasks.movedTasks },
    });

    if (res.error != null) {
        throw new Error(res.error.message);
    }

    return res.data;
}