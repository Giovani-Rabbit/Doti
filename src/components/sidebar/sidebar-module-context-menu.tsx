import { ReactNode } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu"

type SidebarModuleContextMenuProps = {
    children: ReactNode;
};

export default function SidebarModuleContextMenu(
    { children }: SidebarModuleContextMenuProps
) {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>Icone</ContextMenuItem>
                <ContextMenuItem>Renomear</ContextMenuItem>
                <ContextMenuItem variant="destructive">
                    Excluir
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}