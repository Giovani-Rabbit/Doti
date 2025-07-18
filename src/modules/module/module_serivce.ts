import HttpService from "@/util/http/http_service";

function ModuleService() {
    const httpService = new HttpService("module");

    async function createModule() {

    }

    return { createModule }
}

export default ModuleService