"use client"

import { PlusIcon } from "lucide-react";
import { CreateGenericModule } from "@/modules/module/module-interface";
import { useCreateModuleMut } from "@/modules/module/module-query";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function SidebarModuleCreateModuleButton() {
    const addModuleMutation = useCreateModuleMut();

    function handleNewModule() {
        addModuleMutation.mutate(CreateGenericModule());
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <PlusIcon onClick={handleNewModule} />
            </TooltipTrigger>
            <TooltipContent>
                <p>Create Module</p>
            </TooltipContent>
        </Tooltip>
    );
}