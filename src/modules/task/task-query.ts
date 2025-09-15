import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks } from "../module/module-serivce";
import { createTask } from "./task-serivce";
import { createFakeTask, Task } from "./task-interface";
import { showCreateTaskErrToast } from "./task-toast";

export const taskOptions = (moduleId: number) => queryOptions({
    queryKey: ["tasks", moduleId],
    queryFn: () => fetchTasks(moduleId),
    initialData: [],
});

export function useCreateTaskMut(moduleId: number) {
    const queryClient = useQueryClient();
    const options = taskOptions(moduleId);

    const mutation = useMutation({
        mutationFn: createTask,
        onMutate: async ({ task_name, position }) => {
            await queryClient.cancelQueries(options)

            const prevTasks = queryClient.getQueryData<Task[]>(options.queryKey);
            const fakeTask: Task = createFakeTask(moduleId, task_name, position);

            if (prevTasks) {
                const updatedTasks = [...prevTasks, fakeTask]

                queryClient.setQueryData(options.queryKey, updatedTasks)
            }

            return { prevTasks }
        },
        onError: (err, __, context) => {
            if (context?.prevTasks) {
                queryClient.setQueryData<Task[]>(
                    options.queryKey,
                    context.prevTasks
                )
                showCreateTaskErrToast(err);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['task'] });
        },
    });

    return mutation;
}