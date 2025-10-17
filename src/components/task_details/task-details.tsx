import { Calendar1Icon, CheckCheckIcon, ClockIcon, CrosshairIcon, PenIcon, TagIcon } from "lucide-react"

export default function TaskDetails() {
    return (
        <section className="p-8 col-span-2 h-full min-h-0 flex flex-col">
            <header>
                <h1 className="text-2xl font-semibold">Task</h1>
            </header>

            <main className="flex-1 pt-6 flex flex-col min-h-0 overflow-hidden">
                <div className="grid grid-cols-2 gap-4">
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

                <div className="w-full rounded-lg mt-6 pt-4 border-t">
                    <div className="w-full flex items-center justify-between">
                        <h3 className="text-zinc-500 font-semibold mb-2">Description</h3>
                        <PenIcon className="h-4 text-zinc-500" />
                    </div>
                    <p className="text-zinc-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, accusamus laudantium? Eius corporis modi explicabo minus ad sequi laborum cum non, beatae qui. Unde dolores consequatur quisquam dicta quos quasi.
                    </p>
                </div>

                <div className="flex-1 pt-6 flex flex-col min-h-0 overflow-hidden rounded-lg">
                    <h3 className="text-zinc-500 font-semibold mb-2">Sessions</h3>
                    <div className="flex-1 space-y-4 overflow-y-auto pb-4">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="w-full p-4 bg-white rounded-md shadow-sm flex flex-col">
                                <span>Durantion: 60min</span>
                                <span>Date: 19/04/2025 19:59</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </section>
    );
}