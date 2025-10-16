import TaskDetails from "@/components/task_details/task-details";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="grid grid-cols-5 h-full">
            <div className="col-span-3 border-r border-zinc-200">
                {children}
            </div>

            <TaskDetails />
        </div>
    );
}