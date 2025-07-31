import HttpService, { IHttpResult } from "@/util/http/http_service";
import { CreateModuleDTO } from "./module_dto";
import { useSession } from "next-auth/react";
import { Module } from "./module_interface";
import { useCallback, useMemo } from "react";

export type ModuleErrorStatus = {}

function useModuleService() {
    const session = useSession();
    const accessToken = session.data?.accessToken as string;

    const httpService = useMemo(() => {
        return new HttpService("module", accessToken);
    }, [accessToken]);

    const createModule = useCallback(async (module: CreateModuleDTO) => {
        // await new Promise(resolve => setTimeout(resolve, 2000));

        return await httpService.post<
            IHttpResult<Module, ModuleErrorStatus>,
            CreateModuleDTO
        >({
            url: "/",
            data: module,
        });
    }, [httpService]);

    return { createModule };
}

export default useModuleService