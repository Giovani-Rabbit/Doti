"use client"

import { AlarmClockCheckIcon, BookOpen, Bot, Frame, InboxIcon, KanbanIcon, PieChart, Settings2, SquareTerminal, TimerIcon } from "lucide-react";
import { SidebarNav } from "./sidebar-nav";
import { Module } from "./sidebar-modules";

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
                <SidebarNav modules={data} />

                <div className="p-8 grow">
                    {children}
                </div>
            </div>
        </div>
    );
}

// This is sample data.
const data: Module[] = [
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
]