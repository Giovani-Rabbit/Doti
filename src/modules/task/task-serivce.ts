
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