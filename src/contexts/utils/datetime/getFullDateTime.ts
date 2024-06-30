export const getFullDateTime = (year: number, month: number, day: number, hour: number, minute: number): Date => {
    return new Date(year, month, day, hour, minute); // This will give you the desired format
};