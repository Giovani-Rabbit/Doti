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
        name: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        topics: [
            {
                name: "History",
                url: "#",
            },
            {
                name: "Starred",
                url: "#",
            },
            {
                name: "Settings",
                url: "#",
            },
        ],
    },
    {
        name: "Models",
        url: "#",
        icon: Bot,
        topics: [
            {
                name: "Genesis",
                url: "#",
            },
            {
                name: "Explorer",
                url: "#",
            },
            {
                name: "Quantum",
                url: "#",
            },
        ],
    },
    {
        name: "Documentation",
        url: "#",
        icon: BookOpen,
        topics: [
            {
                name: "Introduction",
                url: "#",
            },
            {
                name: "Get Started",
                url: "#",
            },
            {
                name: "Tutorials",
                url: "#",
            },
            {
                name: "Changelog",
                url: "#",
            },
        ],
    },
    {
        name: "Settings",
        url: "#",
        icon: Settings2,
        topics: [
            {
                name: "General",
                url: "#",
            },
            {
                name: "Team",
                url: "#",
            },
            {
                name: "Billing",
                url: "#",
            },
            {
                name: "Limits",
                url: "#",
            },
        ],
    },
]