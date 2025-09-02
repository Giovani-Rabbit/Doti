
export function calculateTaskProgressPercentage(
    progressTime: number,
    sessionTime: number
): number { return (progressTime / sessionTime) * 100; }

export const calculateRemainingTime = (
    seconds: number,
    sessionTime: number
) => sessionTime - seconds;

export function formatTime(remainingTime: number) {
    const min = secondsToMinutes(remainingTime);
    const sec = remainingTime % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
}

const secondsToMinutes = (sec: number) => Math.floor(sec / 60)

export const minutesToSeconds = (min: number) => min * 60;