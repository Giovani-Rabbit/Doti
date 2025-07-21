import { EllipsisIcon, FolderPlusIcon, PlusIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useModuleStore } from "@/modules/module/module_store";
import { CreateGenericModule } from "@/modules/module/module_interface";

export default function SidebarModuleEllipsisButton() {
    const { create } = useModuleStore();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <EllipsisIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => create(CreateGenericModule())}>
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