import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks } from "../module/module-serivce";
import { createTask, deleteTask, updataTaskPosition, updateTaskCompletion } from "./task-serivce";
import { createFakeTask, Task } from "./task-interface";
import { showCreateTaskErrToast, showErrDeletingTask, showErrMovingTaskToast, showErrUpdatingTaskCompletion } from "./task-toast";

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
        onSettled: () => queryClient.invalidateQueries({ queryKey: options.queryKey })
    });

    return mutation;
}

export function useUpdateTaskPositionMut(moduleId: number) {
    const queryClient = useQueryClient();
    const options = taskOptions(moduleId);

    const mutation = useMutation({
        mutationFn: updataTaskPosition,
        onMutate: async ({ tasks }) => {
            await queryClient.cancelQueries(options);

            const prevTasks = queryClient.getQueryData<Task[]>(options.queryKey);
            if (prevTasks) queryClient.setQueryData<Task[]>(options.queryKey, tasks);

            return { prevTasks };
        },
        onError: (err, __, context) => {
            if (context?.prevTasks) {
                queryClient.setQueryData<Task[]>(
                    options.queryKey,
                    context.prevTasks
                )
                showErrMovingTaskToast(err);
            }
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: options.queryKey })
    });

    return mutation;
}

export function useUpdateTaskCompletionMut(moduleId: number) {
    const queryClient = useQueryClient();
    const options = taskOptions(moduleId);

    const mutation = useMutation({
        mutationFn: updateTaskCompletion,
        onMutate: async ({ taskId, isComplete }) => {
            await queryClient.cancelQueries(options)

            const prevTasks = queryClient.getQueryData<Task[]>(options.queryKey);

            if (prevTasks) {
                const taskCompletionUpdated = prevTasks.map(task =>
                    taskId === task.id ? { ...task, is_completed: isComplete } : task
                )

                queryClient.setQueryData(options.queryKey, [...taskCompletionUpdated])
            }

            return { prevTasks }
        },
        onError: (err, __, context) => {
            if (context?.prevTasks) {
                queryClient.setQueryData<Task[]>(
                    options.queryKey,
                    context.prevTasks
                )
                showErrUpdatingTaskCompletion(err);
            }
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: options.queryKey })
    });

    return mutation;
}

export function useDeleteTaskMut(moduleId: number) {
    const queryClient = useQueryClient();
    const options = taskOptions(moduleId);

    const mutation = useMutation({
        mutationFn: deleteTask,
        onMutate: async (taskId: number) => {
            await queryClient.cancelQueries(options)

            const prevTasks = queryClient.getQueryData<Task[]>(options.queryKey);

            if (prevTasks) {
                const taskCompletionUpdated = prevTasks.filter(task => task.id !== taskId)

                queryClient.setQueryData(options.queryKey, [...taskCompletionUpdated])
            }

            return { prevTasks }
        },
        onError: (err, __, context) => {
            if (context?.prevTasks) {
                queryClient.setQueryData<Task[]>(
                    options.queryKey,
                    context.prevTasks
                )
                showErrDeletingTask(err);
            }
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: options.queryKey })
    });

    return mutation;
}