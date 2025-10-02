import { minutesToSeconds } from '@/util/time';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TaskId = number;
export type ProgressRecord = { [id in TaskId]: number };

type TaskProgress = {
    taskInProgress: number | null;

    isSessionRunning: boolean;
    sessionTime: number;
    sessionProgress: ProgressRecord;

    isResting: boolean;
    restTime: number;
    restProgress: number;

    startSessionTimer: (taskId: number) => void;
    startRestTimer: (taskId: number) => void;
    stopTimer: () => void;
    restartTimer: (taskId: number) => void;
};

const useTaskProgressStore = create<TaskProgress>()(
    persist(
        (set) => {
            let intervalId: NodeJS.Timeout | null = null;

            return {
                taskInProgress: null,

                isSessionRunning: false,
                sessionTime: minutesToSeconds(0.1),
                sessionProgress: {},

                isResting: false,
                restTime: minutesToSeconds(0.1),
                restProgress: 0,

                startSessionTimer: (taskId: number) => {
                    if (intervalId) clearInterval(intervalId);

                    set(state => {
                        let currentTime = state.sessionProgress[taskId] || 0

                        // Reset timer if session is already completed
                        if (currentTime >= state.sessionTime) currentTime = 0;

                        return {
                            ...state,
                            taskInProgress: taskId,
                            isSessionRunning: true,
                            isResting: false,
                            sessionProgress: {
                                ...state.sessionProgress,
                                [taskId]: currentTime
                            }
                        }
                    });

                    const incrementProgress = () => set(state => {
                        const currentTime = state.sessionProgress[taskId] ?? 0
                        const futureTime = currentTime + 1;

                        if (futureTime === state.sessionTime && intervalId) {
                            clearInterval(intervalId);

                            state.isSessionRunning = false;
                            state.taskInProgress = null;
                        }

                        return {
                            sessionProgress: {
                                ...state.sessionProgress,
                                [taskId]: futureTime,
                            },
                        }
                    });

                    intervalId = setInterval(incrementProgress, 1000);
                },

                startRestTimer: (taskId: number) => {
                    if (intervalId) clearInterval(intervalId);

                    set(state => {
                        const shouldReset = state.restProgress >= state.restTime;
                        const initialTime = shouldReset ? 0 : state.restProgress;

                        return {
                            ...state,
                            isResting: true,
                            taskInProgress: taskId,
                            restProgress: initialTime,
                        }
                    });

                    const incrementRestProgress = () => set(state => {
                        const currentTime = state.restProgress;
                        const futureTime = currentTime + 1;

                        if (futureTime >= state.restTime && intervalId) {
                            clearInterval(intervalId);
                            state.sessionProgress[taskId] = 0;
                            state.isResting = false;
                            state.taskInProgress = null;
                        }

                        return {
                            ...state,
                            restProgress: futureTime,
                        }
                    });

                    intervalId = setInterval(incrementRestProgress, 1000);
                },

                stopTimer: () => {
                    if (intervalId) {
                        set(state => ({
                            ...state,
                            isSessionRunning: false,
                            isResting: false,
                            taskInProgress: null
                        }));
                        clearInterval(intervalId);
                        intervalId = null;
                    }
                },

                restartTimer: (taskId: number) => {
                    set(state => ({
                        ...state,
                        sessionProgress: {
                            ...state.sessionProgress,
                            [taskId]: 0
                        }
                    }))
                }
            };
        },
        {
            name: 'task-session-progress-storage',
            partialize: (state) => ({ sessionProgress: state.sessionProgress }),
        }
    )
);

export default useTaskProgressStore;