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
    })
}