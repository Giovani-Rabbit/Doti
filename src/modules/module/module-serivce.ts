import HttpService from "@/util/http/http_service";
import { CreateModuleDTO } from "./module-dto";
import { Module } from "./module-interface";
import { Task } from "../task/task-interface";
import { IHttpResponse } from "@/util/http/type/http_message_response";

const httpService = new HttpService("modules");

export async function createModule(module: CreateModuleDTO) {
    const res = await httpService.post<
        CreateModuleDTO,
        Module
    >({
        url: "/",
        data: module,
    });

    if (res.error != null) {
        throw new Error(res.error.message);
    }

    return res.data;
}

type ModulesResponse = { modules: Module[] };

export async function fetchModules(): Promise<Module[]> {
    const res = await httpService.get<ModulesResponse>({
        url: "/",
        data: null,
    });

    if (res.error != null) {
        throw new Error(res.error.message);
    }

    if (res.data) {
        return res.data.modules
    }

    return [];
}

type TasksResponse = { tasks: Task[] }

export async function fetchTasksSSR(
    moduleId: string, authToken: string
): Promise<Task[]> {
    const res = await httpService.get<TasksResponse>({
        url: `/${moduleId}/tasks`,
        headers: { Authorization: authToken }
    });

    if (!res.data?.tasks) return [];

    return res.data.tasks;
}

export async function fetchTasks(moduleId: string): Promise<Task[]> {
    const res = await httpService.get<TasksResponse>({
        url: `/${moduleId}/tasks`,
        data: null,
    });

    if (res.error != null) {
        throw new Error(res.error.message);
    }

    if (res.data) {
        return res.data.tasks
    }

    return [];
}

type NewModuleName = { name: string }

export async function renameModule(id: string, name: string) {
    const res = await httpService.patch<
        NewModuleName, null
    >({
        url: `/${id}/rename`,
        data: { name }
    });

    if (res.error != null) {
        throw new Error(res.error.message);
    }

    return res.data;
}

type UpdateIconHttp = { icon: string }

export async function updateModuleIcon(id: string, icon: string) {
    const res = await httpService.patch<
        UpdateIconHttp, null
    >({
        url: `/${id}/icon`,
        data: { icon }
    });

    if (res.error != null) {
        throw new Error(res.error.message);
    }

    return res.data;
}


export async function removeModule(id: string) {
    const res = await httpService.delete<null>({
        url: `/${id}`,
        data: null
    });

    if (res.error != null) {
        throw new Error(res.error.message);
    }

    return res.data;
}