
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

export const createFakeTask = (
    module_id: number,
    name: string,
    position: number
): Task => {
    return {
        id: Math.random(),
        module_id,
        name: name,
        is_completed: false,
        position,
        created_at: "",
        updated_at: ""
    }
}