import { iconMap, LucideIcon, LucideIconName } from "@/components/icon/LucideIcon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUpdateModuleIconMut } from "@/modules/module/module-query";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";

type IChangeModuleIconDialog = {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    module: { id: string, icon: LucideIconName }
}

export default function ChangeModuleIconDialog({ isOpen, setIsOpen, module: { id, icon } }: IChangeModuleIconDialog) {
    const [selectedIcon, setSelectedIcon] = useState<LucideIconName>(icon);
    const updateIcon = useUpdateModuleIconMut();

    function handleChooseIcon() {
        if (selectedIcon === icon) return setIsOpen(false);

        updateIcon.mutate({ id, icon: selectedIcon })
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
                                onClick={() => setSelectedIcon(key as LucideIconName)}
                                className={`w-10 h-10 flex items-center justify-center rounded-md cursor-pointer
                                    hover:border 
                                    ${selectedIcon === key ? "border border-zinc-800" : ""}`}
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