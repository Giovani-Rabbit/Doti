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
