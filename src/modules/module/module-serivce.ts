import HttpService from "@/util/http/http_service";
import { CreateModuleDTO } from "./module-dto";
import { Module } from "./module-interface";
import { HttpResponse } from "@/util/http/type/http_message_response";

export type ModulesResponse = { modules: Module[] };

const httpService = new HttpService("module");

export async function createModule(module: CreateModuleDTO) {
    return await httpService.post<
        HttpResponse<Module>,
        CreateModuleDTO
    >({
        url: "/",
        data: module,
    });
}

export async function fetchModules() {
    const res = await httpService.get<
        HttpResponse<ModulesResponse>
    >({
        url: "/",
        data: null,
    });

    return res.data.modules;
}
