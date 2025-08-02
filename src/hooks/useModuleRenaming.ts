"use client"

import { useModuleStore } from "@/modules/module/module-store";
import { RefObject, useRef, useState } from "react";

export type ModuleRenamingState = {
    module: { id: string; name: string };
    isRenaming: boolean;
    startRenaming: () => void;
    cancelRenaming: () => void;
    confirmRenaming: () => void;
    inputRef: RefObject<HTMLInputElement | null>;
};

export default function useModuleRenaming(id: string, name: string): ModuleRenamingState {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isRenaming, setIsRenaming] = useState(false);
    const { rename } = useModuleStore();

    const startRenaming = () => setIsRenaming(true);
    const cancelRenaming = () => setIsRenaming(false);
    const confirmRenaming = () => {
        rename(id, inputRef.current?.value as string);
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