

export function calculateTaskProgressPercentage(
    progressTime: number,
    sessionTime: number
): number { return ((progressTime / 60) / sessionTime) * 100; }