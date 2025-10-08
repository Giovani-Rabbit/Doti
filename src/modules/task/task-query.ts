import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks } from "../module/module-serivce";
import { createTask, deleteTask, updataTaskPosition, updateTaskCompletion } from "./task-serivce";
import { createFakeTask, Task } from "./task-interface";
import { showCreateTaskErrToast, showErrDeletingTask, showErrMovingTaskToast, showErrUpdatingTaskCompletion } from "./task-toast";
import useTaskProgressStore from "./store/task-progress-store";
import { MovedTaskParams } from "./task-dto";

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
    });

    return mutation;
}

export function useDeleteTaskMut(moduleId: number) {
    const removeTaskProgressStore = useTaskProgressStore(state => state.removeProgress);
    const updateTaskPosition = useUpdateTaskPositionMut(moduleId);

    const queryClient = useQueryClient();
    const options = taskOptions(moduleId);

    const mutation = useMutation({
        mutationFn: deleteTask,
        onMutate: async (taskId: number) => {
            await queryClient.cancelQueries(options)

            const prevTasks = queryClient.getQueryData<Task[]>(options.queryKey);

            let removedTask: Task[] = [];
            if (prevTasks) {
                removedTask = prevTasks.filter(task => task.id !== taskId)

                queryClient.setQueryData(options.queryKey, [...removedTask])
            }

            return { prevTasks, removedTask }
        },
        onSuccess: (_, b, c) => {
            // update the task position
            if (c.removedTask && c.prevTasks) {
                const currentTasks = c.removedTask;
                const prevTasks = c.prevTasks;

                const movedTasks: MovedTaskParams[] = currentTasks
                    .map((task, index) => ({ id: task.id, position: index }))
                    .filter((task, index) => prevTasks[index].id != task.id);

                if (movedTasks.length != 0) updateTaskPosition.mutate({
                    tasks: currentTasks,
                    movedTasks
                });
            }

            removeTaskProgressStore(b)
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
    });

    return mutation;
}