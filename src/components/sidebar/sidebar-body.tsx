"use client"

import { SidebarModule } from "./sidebar-module";
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
                <SidebarModule />

                <div className="p-8 grow">
                    {children}
                </div>
            </div>
        </div>
    );
}
