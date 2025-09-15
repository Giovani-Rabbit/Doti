import Tasks from "@/components/task/tasks";
import ModuleHeader from "./__components/module_header";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchTasksSSR } from "@/modules/module/module-serivce";
import { cookies } from "next/headers";
import { Suspense } from "react";

interface PageProps { params: Promise<{ id: string; }>; }

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const cookieStore = await cookies();
    const authToken = cookieStore.get('access-token');

    if (!authToken?.value) return <p>Please Login</p>;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["tasks", id],
        queryFn: () => fetchTasksSSR(id, authToken.value)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={"...loading"}>
                <div className="h-screen flex flex-col text-800">
                    <ModuleHeader />
                    <Tasks moduleId={id} />
                </div>
            </Suspense>
        </HydrationBoundary>
    );
}