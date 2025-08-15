import { ExternalToast, toast } from "sonner"

export function showCreateModuleErrToast(
    err: Error,
    retryCallback: () => void,
    toastExternal?: ExternalToast
) {
    toast.error("Error saving a module", {
        description: err.message,
        action: { label: "Retry", onClick: retryCallback },
        position: "top-center",
        ...toastExternal
    });
}

export function showRenameModuleErrToast(
    err: Error,
    retryCallback: () => void,
    toastExternal?: ExternalToast
) {
    toast.error("Error renaming a module", {
        description: err.message,
        action: { label: "Retry", onClick: retryCallback },
        position: "top-center",
        ...toastExternal
    });
}

export function showErrCouldNotDeleteModuleToast(
    err: Error,
    toastExternal?: ExternalToast
) {
    toast.error("Error when deleting module", {
        description: err.message,
        position: "top-center",
        ...toastExternal
    });
}