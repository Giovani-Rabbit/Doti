import { ExternalToast, toast } from "sonner";

export function showCreateTaskErrToast(
    err: Error,
    toastExternal?: ExternalToast
) {
    toast.error("Error creating a Task", {
        description: err.message,
        position: "top-center",
        ...toastExternal
    });
}

export function showErrMovingTaskToast(
    err: Error,
    toastExternal?: ExternalToast
) {
    toast.error("Error on save the task position", {
        description: err.message,
        position: "top-center",
        ...toastExternal
    });
}

export function showErrUpdatingTaskCompletion(
    err: Error,
    toastExternal?: ExternalToast
) {
    toast.error("Error on update task completion", {
        description: err.message,
        position: "top-center",
        ...toastExternal
    });
}

export function showErrDeletingTask(
    err: Error,
    toastExternal?: ExternalToast
) {
    toast.error("Error on delete task", {
        description: err.message,
        position: "top-center",
        ...toastExternal
    });
}

export function showErrRenamingTaskToast(
    err: Error,
    toastExternal?: ExternalToast
) {
    toast.error("Error on rename the task", {
        description: err.message,
        position: "top-center",
        ...toastExternal
    });
}