import HttpService from "@/util/http/http_service";
import { CreateModuleDTO } from "./module-dto";
import { Module } from "./module-interface";
import { HttpResponse } from "@/util/http/type/http_message_response";

export type ModulesResponse = { modules: Module[] };

const httpService = new HttpService("module");

export async function createModule(module: CreateModuleDTO) {
    const res = await httpService.post<
        HttpResponse<Module>,
        CreateModuleDTO
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
        HttpResponse<ModulesResponse>
    >({
        url: "/",
        data: null,
    });

    if (res.error != null) {
        throw new Error(res.error.message);
    }

    return res.data.modules;
}
