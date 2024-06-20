
export const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const isAM = hours < 12;

    if (hours === 0) {
        hours = 12; // Midnight case
    } else if (hours > 12) {
        hours -= 12; // Convert 24-hour to 12-hour format
    }

    return {
        time: `${hours}:${minutes < 10 ? '0' : ''}${minutes}`,
        isAM: isAM
    };
}
