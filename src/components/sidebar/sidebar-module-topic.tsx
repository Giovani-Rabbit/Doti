import { LucideIcon } from "lucide-react";
import { SidebarMenuSubButton, SidebarMenuSubItem } from "../ui/sidebar";

export type Topic = { title: string, url: string, icon?: LucideIcon };

export default function SidebarModuleTopic({ topic }: { topic: Topic }) {
    return (
        <SidebarMenuSubItem key={topic.title}>
            <SidebarMenuSubButton asChild>
                <a href={topic.url}>
                    {topic.icon && <topic.icon />}
                    <span>{topic.title}</span>
                </a>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    );
}