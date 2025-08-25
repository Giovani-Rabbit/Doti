import { useDeleteModuleMut } from "@/modules/module/module-query";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Module } from "@/modules/module/module-interface";
import RenameModuleDialog from "./dialog/rename-module-dialog";
import ChangeModuleIconDialog from "./dialog/change-module-icon-dialog";
import { ImageIcon, MoreHorizontal, PenLineIcon, Trash2Icon } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { SidebarMenuAction } from "../ui/sidebar";

export default function ModuleDropdown({ id, name, icon }: Module) {
    const [isRenameOpen, setIsRenameOpen] = useState<boolean>(false);
    const [isChangeIconOpen, setIsChangeIconOpen] = useState(false);

    const deleteModule = useDeleteModuleMut();

    function handlerDeleteModule() {
        deleteModule.mutate(id);
        redirect("/");
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction
                        showOnHover
                        className="data-[state=open]:bg-accent rounded-sm hover:outline"
                    >
                        <MoreHorizontal />
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem onClick={() => setIsChangeIconOpen(true)}>
                        <ImageIcon />
                        <span>Change Icon</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsRenameOpen(true)}>
                        <PenLineIcon />
                        <span>Rename</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={handlerDeleteModule}
                    >
                        <Trash2Icon />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <RenameModuleDialog
                isOpen={isRenameOpen}
                setIsOpen={setIsRenameOpen}
                module={{ id, name }}
            />

            <ChangeModuleIconDialog
                isOpen={isChangeIconOpen}
                setIsOpen={setIsChangeIconOpen}
                module={{ id, icon }}
            />
        </>
    );
}