import RemainingTime from '@/components/timer/TimeCounter';
import { calculateRemainingTime, minutesToSeconds } from '@/util/time';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TaskId = string;
export type ProgressRecord = { [id in TaskId]: number };

type TaskProgress = {
    progress: ProgressRecord;
    isSessionRunning: boolean;
    taskInProgress: string | null;
    sessionTime: number;

    isRestAvailable: boolean;
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
                sessionTime: minutesToSeconds(60),

                isRestAvailable: false,
                isResting: false,
                restTime: minutesToSeconds(10),

                startTimer: (taskId: string) => {
                    if (intervalId) clearInterval(intervalId);

                    set(state => ({
                        ...state,
                        taskInProgress: taskId,
                        isSessionRunning: true
                    }));

                    function incrementProgress() {
                        set((state) => {
                            const currentTime = state.progress[taskId] || 0

                            if (currentTime === state.sessionTime) {
                                if (intervalId) clearInterval(intervalId);
                                return {
                                    ...state,
                                    isRestAvailable: true,
                                    isSessionRunning: false,
                                    taskInProgress: null
                                }
                            }

                            return {
                                progress: {
                                    ...state.progress,
                                    [taskId]: currentTime + 1,
                                },
                            }
                        });
                    }

                    incrementProgress();

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