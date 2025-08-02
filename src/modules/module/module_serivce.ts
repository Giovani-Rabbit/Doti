"use client"

import HttpService, { IHttpResult } from "@/util/http/http_service";
import { CreateModuleDTO } from "./module_dto";
import { Module } from "./module_interface";

export type ModulesResponse = {
    modules: Module[];
}

function useModuleService() {
    const httpService = new HttpService("module");

    async function createModule(module: CreateModuleDTO) {
        return await httpService.post<
            IHttpResult<Module, null>,
            CreateModuleDTO
        >({
            url: "/",
            data: module,
        });
    }

    async function fetchModules() {
        return await httpService.get<
            IHttpResult<ModulesResponse, null>
        >({
            url: "/",
            data: null,
        });
    }

    return { createModule, fetchModules };
}

export default useModuleService