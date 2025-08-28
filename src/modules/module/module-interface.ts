import { LucideIconName } from "@/components/icon/LucideIcon"
import { CreateModuleDTO } from "./module-dto"

export type Module = {
    id: string
    name: string
    isOpen: boolean
    icon: LucideIconName
}

export const CreateGenericModule = (): CreateModuleDTO => {
    return {
        name: "Sem Nome",
        icon: "component"
    }
}

export const fakeModuleObject: Module = {
    id: Math.random().toString(),
    name: "Sem Nome",
    icon: "component",
    isOpen: false,
}
