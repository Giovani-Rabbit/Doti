import { ReactNode } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu"
import { useModuleStore } from "@/modules/module/module_store";
import { Module } from "@/modules/module/module_interface";

type SidebarModuleContextMenuProps = {
    children: ReactNode;
    targetModule: Module
};

export default function SidebarModuleContextMenu(
    { children, targetModule }: SidebarModuleContextMenuProps
) {
    const { remove } = useModuleStore();

    return (
        <ContextMenu >
            <ContextMenuTrigger>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>
                    Ícone
                </ContextMenuItem>
                <ContextMenuItem>
                    Renomear
                </ContextMenuItem>
                <ContextMenuItem
                    variant="destructive"
                    onClick={() => remove(targetModule.id)}
                >
                    Excluir
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}