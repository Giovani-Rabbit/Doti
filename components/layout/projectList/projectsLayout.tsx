import { Input } from "@/components/ui/input";
import ProjectContainer from "./fragments/projectContainer";
import { Settings2 } from "lucide-react";


const ProjectsLayout = () => {
    return (
        <div className="h-full overflow-auto w-[20vw] border-r border-zinc-300 p-2">
            <div className="flex items-center justify-center gap-4 p-2">
                <Input className="h-8" />
                <Settings2 />
            </div>
            <div className="space-y-3">
                <ProjectContainer />
                <ProjectContainer />
                <ProjectContainer />
                <ProjectContainer />
                <ProjectContainer />
                <ProjectContainer />
                <ProjectContainer />
                <ProjectContainer />
                <ProjectContainer />
            </div>
        </div>
    );
}

export default ProjectsLayout;