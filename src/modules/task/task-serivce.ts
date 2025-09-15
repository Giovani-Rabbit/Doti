import HttpService from "@/util/http/http_service";
import { CreateTaskDTO } from "./task-dto";
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