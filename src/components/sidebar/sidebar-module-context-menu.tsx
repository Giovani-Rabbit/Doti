import { ReactNode } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu"
import { ModuleRenamingState } from "@/hooks/useModuleRenaming";
import { useRemoveModuleMut } from "@/modules/module/module-query";

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
    const removeModuleMutation = useRemoveModuleMut();

    function handleOnClose(e: Event) {
        if (isRenaming) {
            // it was necessary because the input was not focusing
            // REF: https://github.com/radix-ui/primitives/discussions/1447
            e.preventDefault();
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }

    function handleRemoveModule() { removeModuleMutation.mutate(id) }

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
                    onClick={handleRemoveModule}
                >
                    Excluir
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}