import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { createModule, fetchModules } from "./module-serivce";
import { CreateGenericModule, fakeModuleObject, Module } from "./module-interface";
import { showCreateModuleErrToast } from "./module-toast";

export const moduleOptions = queryOptions({
    queryKey: ["module"],
    queryFn: fetchModules,
});

export function useAddModule() {
    const queryClient = useQueryClient();

    function retryCreateModule() {
        mutation.mutate(CreateGenericModule())
    }

    const mutation = useMutation({
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
        onError: (err, __, context) => {
            if (context?.previousModules) {
                queryClient.setQueryData<Module[]>(
                    moduleOptions.queryKey,
                    context.previousModules
                )
                showCreateModuleErrToast(err, retryCreateModule);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['module'] });
        },
    });

    return mutation;
}
