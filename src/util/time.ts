export const calculateTaskProgressPercentage = (
    progressTime: number,
    sessionTime: number
) => {
    if (progressTime === 0 || sessionTime === 0) return 0;
    return 100 - (progressTime / sessionTime) * 100;
}

export function formatTime(remainingTime: number) {
    const min = secondsToMinutes(remainingTime);
    const sec = remainingTime % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
}

export const secondsToMinutes = (sec: number) => Math.floor(sec / 60)

export const minutesToSeconds = (min: number) => min * 60;
