
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRenameModuleMut } from "@/modules/module/module-query";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type NewModuleName = { name: string }

type IRenameModuleDialog = {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    module: { id: string, name: string }
}

export default function RenameModuleDialog({ isOpen, setIsOpen, module: { id, name } }: IRenameModuleDialog) {
    const { register, handleSubmit, reset } = useForm<NewModuleName>({
        defaultValues: { name: name }
    });
    const renameModule = useRenameModuleMut();

    const submitNewName: SubmitHandler<NewModuleName> = (data) => {
        renameModule.mutate({ id, newName: data.name });
        setIsOpen(false);
    }

    useEffect(() => { if (!isOpen) reset }, [isOpen]);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Rename Module</DialogTitle>
                    <DialogDescription>
                        write a new name for your module
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <form onSubmit={handleSubmit(submitNewName)}>
                            <label htmlFor="name" className="sr-only">New Name</label>
                            <Input
                                id="name"
                                {...register("name")}
                            />
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}