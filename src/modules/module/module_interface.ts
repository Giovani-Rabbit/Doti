import { LucideIconName } from "@/components/icon/LucideIcon"
import { Topic } from "../topic/topic_interface"
import { CreateModuleDTO } from "./module_dto"

export type Module = {
    id: string
    name: string
    isOpen: boolean
    icon: LucideIconName
    topics?: Topic[]
}

export const CreateGenericModule = (): CreateModuleDTO => {
    return {
        Name: "Sem Nome",
        Icon: "ComponentIcon"
    }
}
