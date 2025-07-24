import { ReactNode } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu"
import { useModuleStore } from "@/modules/module/module_store";
import { ModuleRenamingState } from "@/hooks/useModuleRenaming";

type SidebarModuleContextMenuProps = {
    children: ReactNode;
} & ModuleRenamingState;

export default function SidebarModuleContextMenu({
    children,
    startRenaming,
    module: { id },
    isRenaming,
    inputRef
}: SidebarModuleContextMenuProps
) {
    const { remove } = useModuleStore();

    function handleOnClose(e: Event) {
        if (isRenaming) {
            // it was necessary because the input was not focusing
            // REF: https://github.com/radix-ui/primitives/discussions/1447
            e.preventDefault();
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent onCloseAutoFocus={handleOnClose}>
                <ContextMenuItem>
                    Ícone
                </ContextMenuItem>
                <ContextMenuItem onClick={startRenaming}>
                    Renomear
                </ContextMenuItem>
                <ContextMenuItem
                    variant="destructive"
                    onClick={() => remove(id)}
                >
                    Excluir
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}