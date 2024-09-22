export const getRemainingTimeInSeconds = (time: number): number => Math.round((time - Date.now()) / 1000)
