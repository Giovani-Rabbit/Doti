import { Task } from "./task-interface"

export type CreateTaskDTO = {
    module_id: number
    task_name: string
    position: number
}

export type MovedTaskParams = { id: number, position: number }

export type UpdateTaskPositionDTO = {
    tasks: Task[]
    movedTasks: MovedTaskParams[]
}

export type UpdateTaskCompletionDTO = {
    taskId: number
    isComplete: boolean
}