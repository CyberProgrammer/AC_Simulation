
export const returnUpdatedDate = (date:Date, isManualDate:boolean, manualMonth: number, manualDay:number) => {
    if(!isManualDate){
        console.log("No wake or sleep date to update, automatic date");
        return date.getTime();
    }

    console.log("Updating date for wake or sleep time");
    // Create a new Date object with the year, month, and day from the original date
    const updatedDate = new Date(date.getFullYear(), manualMonth, manualDay);

    // Preserve the time part from the original date
    updatedDate.setHours(date.getHours());
    updatedDate.setMinutes(date.getMinutes());
    updatedDate.setSeconds(date.getSeconds());
    return updatedDate.getTime();
}