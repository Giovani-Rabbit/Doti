import { minutesToSeconds } from '@/util/time';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TaskId = string;
export type ProgressRecord = { [id in TaskId]: number };

type TaskProgress = {
    progress: ProgressRecord;
    isRunning: boolean;
    taskInProgress: string | null;
    sessionTime: number;
    restTime: number;

    startTimer: (taskId: string) => void;
    stopTimer: () => void;
};

const useTaskProgressStore = create<TaskProgress>()(
    persist(
        (set) => {
            let intervalId: NodeJS.Timeout | null = null;

            return {
                progress: {},
                isRunning: false,
                taskInProgress: null,
                sessionTime: minutesToSeconds(60),
                restTime: minutesToSeconds(10),

                startTimer: (taskId: string) => {
                    if (intervalId) clearInterval(intervalId);

                    set(state => ({
                        ...state,
                        taskInProgress: taskId,
                        isRunning: true,
                    }));

                    const decrementTime = () => set(state => {
                        let currentTime = state.progress[taskId];

                        if (currentTime === undefined) {
                            currentTime = state.sessionTime;
                        }

                        if (currentTime <= 0) {
                            console.log("HORA DE DESCANSAR");
                            return state;
                        }

                        return {
                            progress: {
                                ...state.progress,
                                [taskId]: currentTime - 1,
                            },
                        }
                    });

                    decrementTime();

                    intervalId = setInterval(decrementTime, 1000);
                },

                stopTimer: () => {
                    if (intervalId) {
                        set(state => ({
                            ...state,
                            isRunning: false,
                            taskInProgress: null
                        }));
                        clearInterval(intervalId);
                        intervalId = null;
                    }
                },
            };
        },
        {
            name: 'task-progress-storage',
            partialize: (state) => ({ progress: state.progress }),
        }
    )
);

export default useTaskProgressStore;