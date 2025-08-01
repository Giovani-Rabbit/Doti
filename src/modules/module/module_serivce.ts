"use client"

import HttpService, { IHttpResult } from "@/util/http/http_service";
import { CreateModuleDTO } from "./module_dto";
import { Module } from "./module_interface";

export type ModuleErrorStatus = {
    modules: Module[];
}

function useModuleService(token: string) {
    const httpService = new HttpService("module", token);

    async function createModule(module: CreateModuleDTO) {
        // await new Promise(resolve => setTimeout(resolve, 2000));

        return await httpService.post<
            IHttpResult<Module, ModuleErrorStatus>,
            CreateModuleDTO
        >({
            url: "/",
            data: module,
        });
    }

    async function fetchModules() {
        // await new Promise(resolve => setTimeout(resolve, 2000));

        return await httpService.get<
            IHttpResult<ModuleErrorStatus, null>
        >({
            url: "/",
            data: null,
        });
    }

    return { createModule, fetchModules };
}

export default useModuleService