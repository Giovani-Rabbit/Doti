"use client"

import { ModuleRenamingState } from "@/hooks/useModuleRenaming"
import { KeyboardEvent, useEffect } from "react"

export const RenameableText = ({
    isRenaming,
    cancelRenaming,
    confirmRenaming,
    inputRef,
    module: { name },
}: ModuleRenamingState) => {

    useEffect(() => {
        if (isRenaming && inputRef?.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isRenaming, inputRef]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") confirmRenaming();
        if (e.key === "Escape") cancelRenaming();
    };

    if (!isRenaming) return <span>{name}</span>;

    return (
        <input
            ref={inputRef}
            className="w-[90%] bg-transparent border-none shadow-none focus:outline-none focus:ring-0 focus:border-none focus:shadow-none text-inherit p-0 m-0"
            defaultValue={name}
            onKeyDown={handleKeyDown}
            onBlur={cancelRenaming}
        />
    );
};

export default RenameableText;