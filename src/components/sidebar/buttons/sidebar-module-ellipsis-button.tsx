import { EllipsisIcon, FolderPlusIcon, PlusIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useModuleStore } from "@/modules/module/module_store";
import { CreateGenericModule } from "@/modules/module/module_interface";
import { useMutation } from "@tanstack/react-query";
import useModuleService from "@/modules/module/module_serivce";

export default function SidebarModuleEllipsisButton() {
    const { create } = useModuleStore();
    const { createModule } = useModuleService();

    const mutation = useMutation({
        mutationFn: createModule,
        onSuccess: (data) => create(data.data)
    })

    function handleNewModule() {
        mutation.mutate(CreateGenericModule());
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={mutation.isPending}>
                <EllipsisIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleNewModule}>
                        <FolderPlusIcon />
                        Novo Módulo
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <PlusIcon />
                        Novo Tópico
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}