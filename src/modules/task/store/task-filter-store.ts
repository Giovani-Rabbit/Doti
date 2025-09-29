import { create } from "zustand";

type TaskFilter = {
    SearchTask: (value: string) => void
    searchTaskValue: string
};

const useTaskFilterStore = create<TaskFilter>((set) => ({
    searchTaskValue: "",

    SearchTask: (params: string) => set(() => ({
        searchTaskValue: params.toLocaleLowerCase()
    }))
}));

export default useTaskFilterStore;