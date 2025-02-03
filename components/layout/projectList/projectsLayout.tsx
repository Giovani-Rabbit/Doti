import { Input } from "@/components/ui/input";
import ProjectContainer from "./fragments/projectContainer";

const ProjectsLayout = () => {
    return (
        <div className="h-full overflow-auto w-[22vw] border-r border-zinc-200 p-2 space-y-2">
            <div className="w-full flex items-center justify-center gap-2">
                <Input className="w-full" placeholder="Buscar projeto..." />
            </div>
            <div className="space-y-2">
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