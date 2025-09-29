import { create } from "zustand";

export type TaskFilterStatus = "all" | "completed" | "pending"

type TaskFilter = {
    isUsing: boolean

    searchValue: string
    setSearchValue: (value: string) => void

    taskStatus: TaskFilterStatus
    setTaskStatus: (checked: TaskFilterStatus) => void
};

const useTaskFilterStore = create<TaskFilter>((set) => ({
    isUsing: false,
    searchValue: "",
    taskStatus: "all",

    setSearchValue: (params: string) => set((state) => ({
        searchValue: params.toLocaleLowerCase(),
        isUsing: params != "" || state.taskStatus != "all"
    })),

    setTaskStatus: (value: TaskFilterStatus) => set((state) => ({
        taskStatus: value,
        isUsing: value != "all" || state.searchValue != ""
    }))
}));

export default useTaskFilterStore;