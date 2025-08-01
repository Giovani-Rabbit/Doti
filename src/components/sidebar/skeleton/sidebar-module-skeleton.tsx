import { Skeleton } from "@/components/ui/skeleton";

export function SidebarModuleSkeleton() {
    return (
        <div className="flex flex-col p-2 space-y-4 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="flex gap-2 shrink-0">
                    <Skeleton className="h-[20px] w-[20px] rounded-full" />
                    <Skeleton className="h-[20px] w-full rounded-md" />
                </div>
            ))}
        </div>
    )
}
