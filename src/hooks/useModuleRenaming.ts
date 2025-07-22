import { useModuleStore } from "@/modules/module/module_store";
import { useRef, useState } from "react";

export default function useRenaming() {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isRenaming, setIsRenaming] = useState(false);
    const { rename } = useModuleStore();

    const open = () => setIsRenaming(true);
    const close = () => setIsRenaming(false);
    const confirm = (id: string, newName: string) => {
        rename(id, newName);
        setIsRenaming(false);
    }

    return { isRenaming, open, close, confirm, inputRef };
}
