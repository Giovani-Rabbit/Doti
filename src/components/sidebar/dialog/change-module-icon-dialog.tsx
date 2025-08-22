import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type IChangeModuleIconDialog = {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export default function ChangeModuleIconDialog({ isOpen, setIsOpen }: IChangeModuleIconDialog) {
    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Rename Module</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2">

                </div>
            </DialogContent>
        </Dialog>
    );
}