import { ReactNode, RefObject } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu"
import { useModuleStore } from "@/modules/module/module_store";
import { Module } from "@/modules/module/module_interface";

type SidebarModuleContextMenuProps = {
    children: ReactNode;
    targetModule: Module;
    isRemaning: boolean;
    handleIsRenaming: () => void;
    inputRenaming: RefObject<HTMLInputElement | null>;
};

export default function SidebarModuleContextMenu({
    children,
    targetModule,
    isRemaning,
    handleIsRenaming,
    inputRenaming
}: SidebarModuleContextMenuProps) {
    const { remove } = useModuleStore();

    function handleOnClose(e: Event) {
        if (isRemaning) {
            // it was necessary because the input was not focusing
            // REF: https://github.com/radix-ui/primitives/discussions/1447
            e.preventDefault();
            inputRenaming.current?.focus();
            inputRenaming.current?.select();
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
                <ContextMenuItem onClick={handleIsRenaming}>
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
    );
}