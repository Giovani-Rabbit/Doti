import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TaskId = string;
export type ProgressRecord = { [id in TaskId]: number };

type TaskProgress = {
    progress: ProgressRecord;
    isRunning: boolean;
    taskInProgress: string | null;
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

                startTimer: (taskId: string) => {
                    if (intervalId) clearInterval(intervalId);

                    intervalId = setInterval(() => {
                        set((state) => {
                            const currentTime = state.progress[taskId] || 0

                            return {
                                isRunning: true,
                                progress: {
                                    ...state.progress,
                                    [taskId]: currentTime + 1,
                                },
                            }
                        });
                    }, 1000);
                },

                stopTimer: () => {
                    if (intervalId) {
                        set(state => ({ ...state, isRunning: false }));
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