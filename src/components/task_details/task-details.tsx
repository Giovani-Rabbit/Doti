import { Calendar1Icon, CalendarIcon, CheckCheckIcon, ClockIcon, CrosshairIcon, PenIcon, TagIcon } from "lucide-react"

export default function TaskDetails() {
    return (
        <section className="py-8 col-span-2 h-full min-h-0 flex flex-col">
            <header className="px-8">
                <h1 className="text-2xl font-semibold">Task</h1>
            </header>

            <main className="flex flex-col min-h-0 overflow-hidden">
                <div className="px-8 grid grid-cols-2 gap-4 py-6">
                    <div className="flex text-zinc-600">
                        <CrosshairIcon className="py-1 mr-2" />
                        <span>Session Target</span>
                    </div>
                    <div>6</div>

                    <div className="flex text-zinc-600">
                        <CheckCheckIcon className="py-1 mr-2" />
                        <span>Session Done</span>
                    </div>
                    <div>3</div>

                    <div className="flex text-zinc-600">
                        <ClockIcon className="py-1 mr-2" />
                        <span>Total Time</span>
                    </div>
                    <div>14h</div>

                    <div className="flex text-zinc-600">
                        <TagIcon className="py-1 mr-2" />
                        <span>Priority</span>
                    </div>
                    <div>Low</div>

                    <div className="flex text-zinc-600">
                        <Calendar1Icon className="py-1 mr-2" />
                        <span>Created at</span>
                    </div>
                    <div>15/06/2025</div>
                </div>

                <div className="w-full py-6 border-t px-8">
                    <div className="w-full flex items-center justify-between">
                        <h3 className="text-zinc-500 font-semibold mb-2">Description</h3>
                        <PenIcon className="h-4 text-zinc-500" />
                    </div>
                    <p className="w-full max-h-[300px] text-zinc-800 overflow-auto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
                    </p>
                </div>

                <div className="flex flex-col min-h-0 gap-2">
                    <h3 className="text-zinc-500 font-semibold px-8">Sessions</h3>
                    <div className="flex-1 space-y-3 overflow-y-auto px-8">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-full bg-white gap-2 rounded-md flex flex-col xl:flex-row xl:gap-4"
                            >
                                <span className="flex items-center gap-2">
                                    <CalendarIcon className="h-5 text-zinc-400" />
                                    Date: 19/04/2025 19:59
                                </span>
                                <span className="flex items-center gap-2">
                                    <ClockIcon className="h-5 text-zinc-400" />
                                    Duration: 60min
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </section>
    );
}