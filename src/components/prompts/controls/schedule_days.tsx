import '@components/styles/schedule_days.css'

import checkIcon from '@assets/icons/check_mark.svg';
import {useDispatch, useSelector} from "react-redux";
import {setScheduleDays} from "../../../state/slices/scheduleSlice.ts";
import {RootState} from "../../../state/store.ts";
const ScheduleDaysControls = () => {
    const dispatch = useDispatch();
    const scheduleDays = useSelector((state: RootState) => state.schedule.scheduleDays);
    const handleDayClick = (dayID: number) => {
        const updatedScheduleDays = scheduleDays.includes(dayID) ?
            scheduleDays.filter(day => day !== dayID)
            : [...scheduleDays, dayID]
        dispatch(setScheduleDays(updatedScheduleDays));
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
