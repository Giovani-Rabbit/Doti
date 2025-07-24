import { useModuleStore } from "@/modules/module/module_store";
import { RefObject, useRef, useState } from "react";

export type RenamingState = {
    module: { id: string; name: string };
    isRenaming: boolean;
    startRenaming: () => void;
    cancelRenaming: () => void;
    confirmRenaming: () => void;
    inputRef: RefObject<HTMLInputElement | null>;
};

export default function useRenaming(id: string, name: string): RenamingState {
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