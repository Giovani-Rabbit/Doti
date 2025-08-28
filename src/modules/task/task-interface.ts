
export interface Task {
    id: string
    name: string
    isComplete: boolean
    position: number
    created_at: string
    updated_at: string
}

export interface TaskWithProgress extends Task {
    progress?: number;
}