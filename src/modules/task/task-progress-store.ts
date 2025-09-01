import RemainingTime from '@/components/timer/TimeCounter';
import { calculateRemainingTime } from '@/util/time';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TaskId = string;
export type ProgressRecord = { [id in TaskId]: number };

type TaskProgress = {
    progress: ProgressRecord;
    isRunning: boolean;
    taskInProgress: string | null;
    remainingTime: number;
    sessionTime: number; // in minutes
    restTime: number;
    startTimer: (taskId: string) => void;
    stopTimer: () => void;
    setSessionTime: (time: number) => void;
};

const useTaskProgressStore = create<TaskProgress>()(
    persist(
        (set) => {
            let intervalId: NodeJS.Timeout | null = null;

            return {
                progress: {},
                isRunning: false,
                taskInProgress: null,
                remainingTime: 0,
                sessionTime: 60,
                restTime: 10,

                startTimer: (taskId: string) => {
                    if (intervalId) clearInterval(intervalId);

                    set(state => ({
                        ...state,
                        taskInProgress: taskId,
                        isRunning: true
                    }));

                    function incrementProgress() {
                        set((state) => {
                            const currentTime = state.progress[taskId] || 0
                            const futureTime = currentTime + 1;

                            const remainingTime = calculateRemainingTime(
                                futureTime, state.sessionTime
                            );

                            if (remainingTime <= 0) {
                                console.log("Hora de descansar");
                                return state;
                            }

                            return {
                                remainingTime,
                                progress: {
                                    ...state.progress,
                                    [taskId]: futureTime,
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
                            isRunning: false,
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