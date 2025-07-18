import HttpService, { IHttpResult } from "@/util/http/http_service";
import { CreateModuleDTO, ModuleDTO } from "./module_dto";

function ModuleService() {
    const httpService = new HttpService("module");

    async function createModule(module: CreateModuleDTO) {
        const res = await httpService.post<
            IHttpResult<ModuleDTO[], null>,
            CreateModuleDTO
        >({
            url: "/",
            data: module
        });

        return res;
    }

    return { createModule }
}

export default ModuleService