import { ReactNode } from "react";
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "../ui/context-menu"
import { ImageIcon, Pencil, PencilIcon, Trash2Icon, TrashIcon } from "lucide-react";


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
                <ContextMenuItem>
                    Icone
                </ContextMenuItem>
                <ContextMenuItem>
                    Renomear
                </ContextMenuItem>
                <ContextMenuItem variant="destructive">
                    Excluir
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}