import HttpService from "@/util/http/http_service";
import { CreateModuleDTO } from "./module-dto";
import { Module } from "./module-interface";

export type ModulesResponse = { modules: Module[] };

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

export async function fetchModules() {
    const res = await httpService.get<
        ModulesResponse
    >({
        url: "/",
        data: null,
    });

    if (res.error != null) {
        throw new Error(res.error.message);
    }

    return res.data.modules;
}

type NewModuleName = { name: string }

export async function renameModule(id: string, name: string) {
    const res = await httpService.patch<
        NewModuleName, null
    >({
        url: `/${id}`,
        data: { name: name }
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