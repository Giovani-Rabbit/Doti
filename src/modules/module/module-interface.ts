import { LucideIconName } from "@/components/icon/LucideIcon"
import { Topic } from "../topic/topic_interface"
import { CreateModuleDTO } from "./module-dto"

export type Module = {
    id: string
    name: string
    isOpen: boolean
    icon: LucideIconName
    topics?: Topic[]
}

export const CreateGenericModule = (): CreateModuleDTO => {
    return {
        name: "Sem Nome",
        icon: "ComponentIcon"
    }
}

export const fakeModuleObject: Module = {
    id: Math.random().toString(),
    name: "Sem Nome",
    icon: "ComponentIcon",
    isOpen: false,
}
