import { useId } from "react"
import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

type InputSearchType = {
}

export default function InputSearch({ }: InputSearchType) {
    const id = useId()

    return (
        <div className="*:not-first:mt-2">
            <div className="relative">
                <Input id={id} className="h-8" placeholder="Search" type="text" />
                <button
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Subscribe"
                >
                    <SearchIcon size={16} aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}
