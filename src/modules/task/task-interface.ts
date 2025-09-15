
export interface Task {
    id: number
    name: string
    module_id: number
    is_completed: boolean
    position: number
    created_at: string
    updated_at: string
}

export interface TaskWithProgress extends Task {
    progress?: number;
}