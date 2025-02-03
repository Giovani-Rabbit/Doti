import { Ellipsis, EllipsisVertical, Settings2 } from "lucide-react";

const ProjectContainer = () => {

    return (
        <div className="w-full border border-zinc-200 rounded-lg px-3 py-2 flex items-center justify-start">
            <div className="flex w-full flex-col items-start justify-center">
                <span className="font-semibold text-zinc-600 w-full">Desenvolvimento Web</span>
                <span className="text-xs text-zinc-600 truncate w-full">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </span>
                <div className="w-full flex items-center justify-between mt-2">
                    <div className="h-full flex items-center justify-center gap-1">
                        <div className="h-4 w-4 bg-zinc-500 rounded-full" />
                        <div className="h-4 w-4 bg-zinc-500 rounded-full" />
                        <div className="h-4 w-4 bg-zinc-500 rounded-full" />
                        <div className="h-4 w-4 bg-zinc-500 rounded-full" />
                    </div>
                    <Ellipsis className="rounded-md hover:ring-1 ring-zinc-200" />
                </div>
            </div>
        </div>
    );
}

export default ProjectContainer;