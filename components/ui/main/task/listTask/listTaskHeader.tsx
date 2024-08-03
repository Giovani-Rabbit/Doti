import SearchInput from "@/components/ui/widgets/input/searchInput";
import { LayoutGrid, List, Plus, Settings2 } from "lucide-react";

const ListTaskHeader = () => {
    return (
        <>
            <div className="w-full h-16 flex items-center justify-between">
                <div className="w-full h-full flex items-center justify-start gap-2">
                    <SearchInput />
                    <button className="px-3 py-2 rounded-lg bg-violet-50 text-violet-500 hover:bg-violet-100">
                        <Settings2 className="w-4" />
                    </button>
                </div>
                <div className="w-full h-full flex items-center justify-end gap-2">
                    <button className="flex px-3 py-2 rounded-lg bg-indigo-50 text-indigo-500 hover:bg-indigo-50">
                        <Plus className="w-4" />
                    </button>
                    <button className="flex px-3 py-2 rounded-lg bg-violet-50 text-violet-500 hover:bg-violet-100">
                        <LayoutGrid className="w-4" />
                        {/* <List className="w-4" /> */}
                    </button>
                </div>
            </div>
        </>
    );
}

export default ListTaskHeader;