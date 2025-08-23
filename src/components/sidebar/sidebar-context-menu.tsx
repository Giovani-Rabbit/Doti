import { useDeleteModuleMut } from "@/modules/module/module-query";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { redirect } from "next/navigation";
import { ReactNode, useState } from "react";
import { Module } from "@/modules/module/module-interface";
import RenameModuleDialog from "./dialog/rename-module-dialog";
import ChangeModuleIconDialog from "./dialog/change-module-icon-dialog";

type SidebarModuleContextMenuProps = {
    children: ReactNode;
} & Module;

export default function ModuleContextMenu({ children, id, name }: SidebarModuleContextMenuProps) {
    const [isRenameOpen, setIsRenameOpen] = useState<boolean>(false);
    const [isChangeIconOpen, setIsChangeIconOpen] = useState(false);

    const deleteModule = useDeleteModuleMut();

    function handlerDeleteModule() {
        deleteModule.mutate(id);
        redirect("/");
    }

    return (
        <>
            <ContextMenu modal={false}>
                <ContextMenuTrigger>
                    {children}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem onClick={() => setIsChangeIconOpen(true)}>
                        Change Icon
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => setIsRenameOpen(true)}>
                        Rename
                    </ContextMenuItem>
                    <ContextMenuItem
                        variant="destructive"
                        onClick={handlerDeleteModule}
                    >
                        Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            <RenameModuleDialog
                isOpen={isRenameOpen}
                setIsOpen={setIsRenameOpen}
                module={{ id, name }}
            />

            <ChangeModuleIconDialog
                isOpen={isChangeIconOpen}
                setIsOpen={setIsChangeIconOpen}
            />
        </>
    );
}