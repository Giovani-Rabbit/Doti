import Tasks from "@/components/task/tasks";
import ModuleHeader from "./__components/module_header";
import { getTasksSSR } from "@/modules/module/module-serivce";
import { cookies } from "next/headers";

interface PageProps { params: Promise<{ id: string; }>; }

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const cookieStore = await cookies();

    const authToken = cookieStore.get("access-token");

    if (!authToken?.value) return <p>Please Login</p>

    const { data, error } = await getTasksSSR(id, authToken.value);
    if (error !== null) return <p>{error.message}</p>

    const tasks = data?.tasks || [];

    return (
        <div className="h-screen flex flex-col text-800">
            <ModuleHeader />
            <Tasks tasks={tasks} />
        </div>
    );
}