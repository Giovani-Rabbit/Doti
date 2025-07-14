import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronRight, LucideIcon } from "lucide-react"
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "../ui/sidebar";
import SidebarModuleTopic, { Topic } from "./sidebar-module-topic";

export type Module = {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: Topic[]
}

export default function SidebarModules({ module }: { module: Module }) {
    const Icon = module.icon;

    return (
        <Collapsible
            key={module.title}
            asChild
            defaultOpen={module.isActive}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={module.title}>
                        {Icon && <Icon />}
                        <span>{module.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <SidebarMenuSub>
                        {module.items?.map((topic, idx) => (
                            <SidebarModuleTopic key={idx} topic={topic} />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}