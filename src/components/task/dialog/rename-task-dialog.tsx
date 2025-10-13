import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRenameTaskMut } from "@/modules/task/task-query";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type NewTaskName = { taskName: string }

type IRenameTaskDialog = {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    task: { id: number, name: string }
    moduleId: number
}

export default function RenameTaskDialog({
    isOpen, setIsOpen, task: { id, name }, moduleId
}: IRenameTaskDialog) {
    const { register, handleSubmit } = useForm<NewTaskName>({
        defaultValues: { taskName: name }
    });

    const renameTaskMut = useRenameTaskMut(moduleId);

    const submitNewName: SubmitHandler<NewTaskName> = useCallback(data => {
        renameTaskMut.mutate({ taskId: id, taskName: data.taskName });
        setIsOpen(false);
    }, [id, name]);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Rename Task</DialogTitle>
                    <DialogDescription>
                        write a new name for your task
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <form onSubmit={handleSubmit(submitNewName)}>
                            <label
                                htmlFor="name"
                                className="sr-only">
                                New Name
                            </label>
                            <Input
                                id="name"
                                {...register("taskName")}
                            />
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}