"use client"

import { EllipsisIcon, FolderPlusIcon, PlusIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CreateGenericModule } from "@/modules/module/module-interface";
import { useAddModule } from "@/modules/module/module-query";

export default function SidebarModuleEllipsisButton() {
    const addModuleMutation = useAddModule();

    function handleNewModule() {
        addModuleMutation.mutate(CreateGenericModule());
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={addModuleMutation.isPending}>
                <EllipsisIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleNewModule}>
                        <FolderPlusIcon />
                        Novo Módulo
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <PlusIcon />
                        Novo Tópico
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}