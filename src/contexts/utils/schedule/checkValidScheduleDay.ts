import {DayOfWeek} from "@customTypes/enums.ts";

export const isValidScheduleDay = (scheduleDays: number[], currentDay: number, manualCalendarDay?: DayOfWeek, isManualDate?: boolean) => {
    if (isManualDate && manualCalendarDay !== undefined) {
        return scheduleDays.includes(manualCalendarDay);
    }
    return scheduleDays.includes(currentDay);
};