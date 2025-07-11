"use client"

import { AlarmClockCheckIcon, BookOpen, Bot, Frame, InboxIcon, KanbanIcon, PieChart, Settings2, SquareTerminal, TimerIcon } from "lucide-react";
import { SidebarProvider } from "../ui/sidebar";
import { NavMain } from "./sidebar-collapse";

export default function SideberBody({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full h-screen flex">
            <nav className="w-12 py-2 gap-1 h-screen flex flex-col items-center justify-start border-r border-zinc-200">
                <AlarmClockCheckIcon className="h-8 w-auto p-1.5 bg-zinc-800 rounded-lg stroke-zinc-100" />

                <div className="h-4" />

                <InboxIcon className="h-8 w-8 p-2 rounded-lg hover:bg-zinc-50 stroke-zinc-800" />
                <KanbanIcon className="h-8 w-8 p-2 rounded-lg hover:bg-zinc-50 stroke-zinc-800" />
                <TimerIcon className="h-8 w-8 p-2 rounded-lg hover:bg-zinc-50 stroke-zinc-800" />
            </nav>

            <div className="grow flex">
                <div className="w-[250px] h-screen bg-zinc-50">
                    <SidebarProvider>
                        <NavMain items={data.navMain} />
                    </SidebarProvider>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}