import { LucideIcon } from "lucide-react"

export interface ModuleDTO {
    id: string
    name: string
    is_opne: boolean
    icon: LucideIcon
    created_at: string
    updated_at: string
}

export type CreateModuleDTO = {
    Name: string
    Icon: LucideIcon
}
