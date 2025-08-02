import HttpService, { IHttpResult } from "@/util/http/http_service";
import { CreateModuleDTO } from "./module-dto";
import { Module } from "./module-interface";

export type ModulesResponse = { modules: Module[] };

const httpService = new HttpService("module");

export async function createModule(module: CreateModuleDTO) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return await httpService.post<
        IHttpResult<Module, null>,
        CreateModuleDTO
    >({
        url: "/",
        data: module,
    });
}

export async function fetchModules() {
    return await httpService.get<
        IHttpResult<ModulesResponse, null>
    >({
        url: "/",
        data: null,
    });
}
