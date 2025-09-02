import { minutesToSeconds } from '@/util/time';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TaskId = string;
export type ProgressRecord = { [id in TaskId]: number };

type TaskProgress = {
    progress: ProgressRecord;
    isSessionRunning: boolean;
    taskInProgress: string | null;
    sessionTime: number;

    isResting: boolean;
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
                isSessionRunning: false,
                taskInProgress: null,
                sessionTime: minutesToSeconds(0.1),

                isResting: false,
                restTime: minutesToSeconds(10),

                startTimer: (taskId: string) => {
                    if (intervalId) clearInterval(intervalId);

                    set(state => {
                        let currentTime = state.progress[taskId] || 0

                        // Reset timer if session is already completed
                        if (currentTime >= state.sessionTime) currentTime = 0;

                        return {
                            ...state,
                            taskInProgress: taskId,
                            isSessionRunning: true,
                            progress: {
                                ...state.progress,
                                [taskId]: currentTime
                            }
                        }
                    });

                    const incrementProgress = () => set(state => {
                        const currentTime = state.progress[taskId] ?? 0
                        const futureTime = currentTime + 1;

                        if (futureTime === state.sessionTime && intervalId) {
                            clearInterval(intervalId);

                            state.isSessionRunning = false;
                            state.taskInProgress = null;
                        }

                        return {
                            progress: {
                                ...state.progress,
                                [taskId]: futureTime,
                            },
                        }
                    });

                    intervalId = setInterval(incrementProgress, 1000);
                },

                stopTimer: () => {
                    if (intervalId) {
                        set(state => ({
                            ...state,
                            isSessionRunning: false,
                            taskInProgress: null
                        }));
                        clearInterval(intervalId);
                        intervalId = null;
                    }
                },

                setSessionTime: (time: number) => set(state => ({
                    ...state,
                    sessionTime: time,
                }))
            };
        },
        {
            name: 'task-progress-storage',
            partialize: (state) => ({ progress: state.progress }),
        }
    )
);

export default useTaskProgressStore;