import { EllipsisIcon, FolderPlusIcon, PlusIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function SidebarModuleEllipsisButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <EllipsisIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
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