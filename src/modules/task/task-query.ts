import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

export const taskOptions = queryOptions({
    queryKey: ["module"],
    // queryFn: fetchModules,
});

// export function useChangeTaskPositionMut() {
//     const queryClient = useQueryClient();

//     const mutation = useMutation({
//         // mutationFn: (id: string ) => renameModule(id),
//         onMutate: async (id) => {
//             await queryClient.cancelQueries(taskOptions);

//             const prevTasks = queryClient.getQueryData(taskOptions.queryKey);

//             if (prevTasks) {
//                 const updatedModules = prevTasks.map(mod =>
//                     mod.id === id ? { ...mod, name: newName } : mod
//                 );

//                 queryClient.setQueryData(moduleOptions.queryKey, updatedModules);
//             }

//             return { prevModules };
//         },
//         onError: (err, variables, context) => {
//             if (context?.prevModules) {
//                 queryClient.setQueryData<Module[]>(
//                     moduleOptions.queryKey,
//                     context.prevModules
//                 );
//                 showCreateModuleErrToast(err, () => mutation.mutate({
//                     id: variables.id,
//                     newName: variables.newName
//                 }));
//             }
//         },
//         onSettled: () => {
//             queryClient.invalidateQueries({ queryKey: ['module'] });
//         },
//     });

//     return mutation;
// }