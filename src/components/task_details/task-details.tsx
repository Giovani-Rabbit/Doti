import { Calendar1Icon, CheckCheckIcon, ClockIcon, CrosshairIcon, TagIcon } from "lucide-react"

export default function TaskDetails() {
    return (
        <section className="p-8 col-span-2">
            <header>
                <h1 className="text-2xl font-semibold">Task</h1>
            </header>
            <main className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex text-zinc-600">
                        <CrosshairIcon className="py-1 mr-2" />
                        <span>Session Target</span>
                    </div>
                    <div className="">aaaaa</div>

                    <div className="flex text-zinc-600">
                        <CheckCheckIcon className="py-1 mr-2" />
                        <span>Session done</span>
                    </div>
                    <div className="">aaaaa</div>

                    <div className="flex text-zinc-600">
                        <ClockIcon className="py-1 mr-2" />
                        <span>Total Time</span>
                    </div>
                    <div className="">aaaaa</div>

                    <div className="flex text-zinc-600">
                        <TagIcon className="py-1 mr-2" />
                        <span>Priority</span>
                    </div>
                    <div className="">aaaaa</div>

                    <div className="flex text-zinc-600">
                        <Calendar1Icon className="py-1 mr-2" />
                        <span>Created at</span>
                    </div>
                    <div className="">aaaaa</div>
                </div>
            </main>
        </section>
    );
}