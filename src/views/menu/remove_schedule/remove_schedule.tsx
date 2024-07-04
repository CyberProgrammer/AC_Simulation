import React from "react";
import ThermostatButton from "@components/buttons/thermostat_button.tsx";
import {removeSchedule} from "@utils/schedule_handlers/initializeSchedule.ts";
import {useDispatch} from "react-redux";

interface RemoveScheduleParams{
    setView: React.Dispatch<React.SetStateAction<number>>;
    setIsNavigationActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const RemoveSchedule = (
    {
        setView,
        setIsNavigationActive
    } : RemoveScheduleParams) => {

    setIsNavigationActive(false);

    const dispatch = useDispatch();
    const handleButtonClick = (id:number) => {
        switch (id){
            case 1:
                removeSchedule(dispatch);
                setView(-1);
                setIsNavigationActive(true);
                break;
            case 2:
                setView(-1);
                setIsNavigationActive(true);
                break;
        }
    }

    return(
        <div className={"menu-container"}>
            <div className={"menu-body"}>
                <div className={"menu-content"}>
                    <div className={"menu-options"}>
                        <div className={"menu-option"}>
                            <p className={"dotted-text prompt"}>
                                Are you sure you want to remove the schedule?
                            </p>
                        </div>
                    </div>
                </div>
                <div className={"schedule-controls"}>
                    <div className={"control-center"}>
                        <ThermostatButton
                            className={"thermostat-button"}
                            clickEvent={() => handleButtonClick(1)}
                            isNavigationActive={true}
                            text={"Yes"}
                        />
                        <ThermostatButton
                            className={"thermostat-button"}
                            clickEvent={() => handleButtonClick(2)}
                            isNavigationActive={true}
                            text={"Cancel"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveSchedule;
