import { ComponentIcon, LucideIcon } from "lucide-react"
import { Topic } from "../topic/topic_interface"

export type Module = {
    id: string
    name: string
    isOpen: boolean
    icon: LucideIcon
    topics?: Topic[]
}

export const CreateGenericModule = (): Module => {
    return {
        id: crypto.randomUUID(),
        name: "Sem Nome",
        isOpen: false,
        icon: ComponentIcon,
        topics: []
    }
}
