
export const formatTime = (hour: number, minute: number) => {
    // Determine if it's AM or PM
    const isAM = hour < 12;

    // Adjust hour to 12-hour format and handle leading zeros
    const formattedHour = hour % 12 === 0 ? hour === 12 ? 12 : 0 : hour % 12;
    const displayHour = formattedHour < 10 ? `0${formattedHour}` : `${formattedHour}`;

    // Format the minute with leading zero if needed
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;

    // Determine AM or PM period
    const period = isAM ? "am" : "pm";

    return {
        time: `${displayHour}:${formattedMinute}`,
        period: period
    };
};