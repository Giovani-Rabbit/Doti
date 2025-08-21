"use client"

import { PlusIcon } from "lucide-react";
import { CreateGenericModule } from "@/modules/module/module-interface";
import { useCreateModuleMut } from "@/modules/module/module-query";

export default function SidebarModuleCreateModuleButton() {
    const addModuleMutation = useCreateModuleMut();

    function handleNewModule() {
        addModuleMutation.mutate(CreateGenericModule());
    }

    return (
        <PlusIcon onClick={handleNewModule} />
    );
}