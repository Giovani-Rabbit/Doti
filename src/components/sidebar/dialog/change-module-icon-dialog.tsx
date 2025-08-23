import { iconMap, LucideIcon, LucideIconName } from "@/components/icon/LucideIcon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";

type IChangeModuleIconDialog = {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export default function ChangeModuleIconDialog({ isOpen, setIsOpen }: IChangeModuleIconDialog) {
    const [selectedIcon, setSelectedIcon] = useState<string>("");

    function handleChooseIcon() {
        setIsOpen(false);
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Icon</DialogTitle>
                    <DialogDescription>Choose an icon and save it</DialogDescription>
                </DialogHeader>
                <div className="w-full p-2 flex items-center justify-center">
                    <div className="w-full h-full grid grid-cols-8 gap-2 place-items-center">
                        {Object.entries(iconMap).map(([key]) => (
                            <div
                                key={key}
                                onClick={() => setSelectedIcon(key)}
                                className={`w-10 h-10 flex items-center justify-center rounded-md cursor-pointer
                                    hover:border 
                                    ${selectedIcon === key ? "border-2 border-zinc-500" : ""}`}
                            >
                                <LucideIcon name={key as LucideIconName} />
                            </div>
                        ))}
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleChooseIcon}
                        variant="default">
                        Save
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}