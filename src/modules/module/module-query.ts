import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { createModule, fetchModules, removeModule, renameModule, updateModuleIcon } from "./module-serivce";
import { CreateGenericModule, fakeModuleObject, Module } from "./module-interface";
import { showCreateModuleErrToast, showErrCouldNotDeleteModuleToast, showErrCouldNotUpdateModuleIconToast } from "./module-toast";
import { LucideIconName } from "@/components/icon/LucideIcon";

export const moduleOptions = queryOptions({
    queryKey: ["module"],
    queryFn: fetchModules,
});

export function useModuleById(id: string) {
    const queryClient = useQueryClient();

    const modules = queryClient.getQueryData<Module[]>(moduleOptions.queryKey);

    return modules?.find(m => String(m.id) === id);
}

export function useCreateModuleMut() {
    const queryClient = useQueryClient();

    function retryCreateModule() {
        mutation.mutate(CreateGenericModule())
    }

    const mutation = useMutation({
        mutationFn: createModule,
        onMutate: async () => {
            await queryClient.cancelQueries(moduleOptions)

            const prevModules = queryClient.getQueryData<Module[]>(moduleOptions.queryKey);

            if (prevModules) {
                const updatedModules = [...prevModules, fakeModuleObject]

                queryClient.setQueryData(moduleOptions.queryKey, updatedModules)
            }

            return { prevModules }
        },
        onError: (err, __, context) => {
            if (context?.prevModules) {
                queryClient.setQueryData<Module[]>(
                    moduleOptions.queryKey,
                    context.prevModules
                )
                showCreateModuleErrToast(err, retryCreateModule);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['module'] }); // request the modules again
        },
    });

    return mutation;
}

type RenameModuleInput = { id: string, newName: string }

export function useRenameModuleMut() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, newName }: RenameModuleInput) => renameModule(id, newName),
        onMutate: async ({ id, newName }) => {
            await queryClient.cancelQueries(moduleOptions);

            const prevModules = queryClient.getQueryData(moduleOptions.queryKey);

            if (prevModules) {
                const updatedModules = prevModules.map(mod =>
                    mod.id === id ? { ...mod, name: newName } : mod
                );

                queryClient.setQueryData(moduleOptions.queryKey, updatedModules);
            }

            return { prevModules };
        },
        onError: (err, variables, context) => {
            if (context?.prevModules) {
                queryClient.setQueryData<Module[]>(
                    moduleOptions.queryKey,
                    context.prevModules
                );
                showCreateModuleErrToast(err, () => mutation.mutate({
                    id: variables.id,
                    newName: variables.newName
                }));
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['module'] });
        },
    });

    return mutation;
}

type UpdateIconInput = { id: string, icon: LucideIconName }

export function useUpdateModuleIconMut() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, icon }: UpdateIconInput) => updateModuleIcon(id, icon),
        onMutate: async ({ id, icon }) => {
            await queryClient.cancelQueries(moduleOptions);

            const prevModules = queryClient.getQueryData(moduleOptions.queryKey);

            if (prevModules) {
                const updatedModules = prevModules.map(mod =>
                    mod.id === id ? { ...mod, icon: icon } : mod
                );

                queryClient.setQueryData(moduleOptions.queryKey, updatedModules);
            }

            return { prevModules };
        },
        onError: (err, _, context) => {
            if (context?.prevModules) {
                queryClient.setQueryData<Module[]>(
                    moduleOptions.queryKey,
                    context.prevModules
                );
                showErrCouldNotUpdateModuleIconToast(err)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['module'] });
        },
    });

    return mutation;
}

export function useDeleteModuleMut() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => removeModule(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries(moduleOptions);

            const prevModules = queryClient.getQueryData(moduleOptions.queryKey);

            if (prevModules) {
                const updatedModules = prevModules.filter(mod => mod.id !== id && mod);

                queryClient.setQueryData(moduleOptions.queryKey, updatedModules);
            }

            return { prevModules };
        },
        onError: (err, _, context) => {
            if (context?.prevModules) {
                queryClient.setQueryData<Module[]>(
                    moduleOptions.queryKey,
                    context.prevModules
                );
                showErrCouldNotDeleteModuleToast(err)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['module'] });
        },
    });

    return mutation;
}
