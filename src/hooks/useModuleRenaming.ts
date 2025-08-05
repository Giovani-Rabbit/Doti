"use client"

import { useRenameModuleMut } from "@/modules/module/module-query";
import { RefObject, useRef, useState } from "react";

export type ModuleRenamingState = {
    module: { id: string; name: string };
    isRenaming: boolean;
    startRenaming: () => void;
    cancelRenaming: () => void;
    confirmRenaming: () => void;
    inputRef: RefObject<HTMLInputElement | null>;
};

export function useModuleRenaming(id: string, name: string): ModuleRenamingState {
    const renameModuleMutation = useRenameModuleMut();

    const inputRef = useRef<HTMLInputElement>(null);
    const [isRenaming, setIsRenaming] = useState(false);

    const startRenaming = () => setIsRenaming(true);
    const cancelRenaming = () => setIsRenaming(false);

    const confirmRenaming = () => {
        const newName = inputRef.current?.value as string;

        if (newName) renameModuleMutation.mutate({ id, newName });

        setIsRenaming(false);
    };

    return {
        module: { id, name },
        isRenaming,
        startRenaming,
        cancelRenaming,
        confirmRenaming,
        inputRef,
    };
}