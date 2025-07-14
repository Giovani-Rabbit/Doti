import { AlarmClockCheckIcon, InboxIcon, KanbanIcon, TimerIcon } from "lucide-react";



export default function SidebarNav() {
    return (
        <nav className="w-12 py-2 gap-1 h-screen flex flex-col items-center justify-start border-r border-zinc-200">
            <AlarmClockCheckIcon className="h-8 w-auto p-1.5 bg-zinc-800 rounded-lg stroke-zinc-100" />

            <div className="h-4" />

            <InboxIcon className="h-8 w-8 p-2 rounded-lg hover:bg-zinc-50 stroke-zinc-800" />
            <KanbanIcon className="h-8 w-8 p-2 rounded-lg hover:bg-zinc-50 stroke-zinc-800" />
            <TimerIcon className="h-8 w-8 p-2 rounded-lg hover:bg-zinc-50 stroke-zinc-800" />
        </nav>

    )
}