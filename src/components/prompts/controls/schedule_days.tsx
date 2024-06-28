import '@components/styles/schedule_days.css'

import checkIcon from '@assets/icons/check_mark.svg';
import {useSchedule} from "@contexts/schedule_context.tsx";
const ScheduleDaysControls = () => {
    const {scheduleDays, setScheduleDays} = useSchedule();
    const handleDayClick = (dayID: number) => {
        setScheduleDays(prevDays =>
            prevDays.includes(dayID)
                ? prevDays.filter(day => day !== dayID)
                : [...prevDays, dayID]
        );
    };

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div id="schedule-days-row">
            <div className="schedule-days-container">
                {days.map((day, index) => (
                    <button
                        key={index}
                        className="day-button"
                        onClick={() => handleDayClick(index)}
                    >
                        {scheduleDays.includes(index) &&
                            <img className={"check-icon"} src={checkIcon} alt="Icon" />
                        }
                        <p className={"day-name"}>{day}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ScheduleDaysControls;
