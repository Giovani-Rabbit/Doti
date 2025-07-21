import { ComponentIcon, LucideIcon } from "lucide-react"

export type ModuleDTO = {
    id: string
    name: string
    is_open: boolean
    icon: LucideIcon
    created_at: string
    updated_at: string
}

export type CreateModuleDTO = {
    Name: string
    Icon: LucideIcon
}
