import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { createModule, fetchModules } from "./module-serivce";
import { fakeModuleObject, Module } from "./module-interface";

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
                const updatedModules = [...previousModules, fakeModuleObject]

                queryClient.setQueryData(moduleOptions.queryKey, updatedModules)
            }

            return { previousModules }
        },
        onError: (_, __, context) => {
            if (context?.previousModules) {
                queryClient.setQueryData<Module[]>(
                    moduleOptions.queryKey,
                    context.previousModules
                )
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['module'] });
        },
    });
}
