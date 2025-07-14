"use client"

import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";
import { Module, SidebarModule } from "./sidebar-module";
import SidebarNav from "./sidebar-nav";

export default function SideberBody({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full h-screen flex">
            <SidebarNav />

            <div className="grow flex">
                <SidebarModule modules={data} />

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
        topics: [
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
        topics: [
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
        topics: [
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
        topics: [
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