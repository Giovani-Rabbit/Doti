import ListTask from "@/components/ui/main/task/listTask/listTask";

const Page = () => {
    return (
        <>
            <main className="flex w-full h-full divide-x-[1px] divide-zinc-300">
                <div className="px-8 py-4 w-1/2 h-full">
                    <div className="w-full h-full">
                        <ListTask />
                    </div>
                </div>
                <div className="p-8 w-1/2 h-full">
                    <div className="w-full h-full">

                    </div>
                </div>
            </main>
        </>
    );
}

export default Page;