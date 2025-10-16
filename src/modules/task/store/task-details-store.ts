import { create } from "zustand";
import { Task } from "../task-interface";


type TaskDetails = {
    task: Task | null
};

const useTaskDetailsStore = create<TaskDetails>((set) => ({
    task: null
}));

export default useTaskDetailsStore;