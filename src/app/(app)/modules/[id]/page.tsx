import Tasks from "@/components/task/tasks";
import ModuleHeader from "./__components/module_header";

interface PageProps { params: Promise<{ id: string; }>; }

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    const moduleId = parseInt(id);

    return (
        <div className="h-screen flex flex-col text-800">
            <ModuleHeader />
            <Tasks moduleId={moduleId} />
        </div>
    );
}