export const Slowdown = {
    fromPercentage(slowdownPercentage: number): number {
        return (100 - slowdownPercentage) / 100;
    }
}
