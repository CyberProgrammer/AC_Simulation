
interface params{
    manualMinute: number;
    manualHour: number;
    setManualHour: (hour: number) => void;
    setManualMinute: (minute: number) => void;
    manuallySetTime: (hourInput: number, minuteInput: number) => void;
}

const handleNextHour = (prevHour:number, setManualHour: (hour: number) => void,setManualMinute: (minute: number) => void) => {
    const newMinute = 0;
    let newHour = prevHour + 1;
    // If next hour is midnight, advance to 0
    if (newHour === 24) {
        newHour = 0;
    }
    setManualHour(newHour);
    setManualMinute(newMinute);
}
 export const incrementManualTime = ({manualMinute, manualHour, setManualHour, setManualMinute, manuallySetTime}:params) => {
    const newMinute = manualMinute + 1;
    if(newMinute === 60) handleNextHour(manualHour, setManualHour, setManualMinute);
    else{
        setManualMinute(newMinute);
        manuallySetTime(manualHour, newMinute);
    }
};
