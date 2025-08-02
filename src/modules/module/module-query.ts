import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { createModule, fetchModules } from "./module-serivce";
import { fakeModule } from "./module-interface";

export const moduleOptions = queryOptions({
    queryKey: ["module"],
    queryFn: fetchModules,
});

export function useAddModule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createModule,
        onMutate: async () => {
            await queryClient.cancelQueries(moduleOptions)

            const previousModules = queryClient.getQueryData(moduleOptions.queryKey);

            if (previousModules) {
                const oldModules = previousModules.data.modules

                const updatedModules = [...oldModules, fakeModule]

                queryClient.setQueryData(moduleOptions.queryKey, {
                    ...previousModules,
                    data: { modules: updatedModules }
                })
            }

            return { previousModules }
        },
        // onError: (err, newModule, context) => {
        //     if (context?.previousModules) {
        //         queryClient.setQueryData<IHttpResult<ModulesResponse, null>>(['module'], context.previousModules)
        //     }
        // },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['module'] });
        },
    });
}
