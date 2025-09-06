import { LucideIconName } from "@/components/icon/LucideIcon"
import { CreateModuleDTO } from "./module-dto"

export type Module = {
    id: string
    name: string
    isOpen: boolean
    icon: LucideIconName
    sessionTime: number
    restTime: number
}

export const CreateGenericModule = (): CreateModuleDTO => {
    return {
        name: "Module Name",
        icon: "component"
    }
}

export const fakeModuleObject: Module = {
    id: Math.random().toString(),
    name: "Module Name",
    icon: "component",
    isOpen: false,
    sessionTime: 60,
    restTime: 15
}
