
import React, {useState} from "react";
import SetScheduleDays from "./content/set_schedule_days.tsx";
import CreateSchedule from "./content/create_schedule.tsx";

interface NoAssistantParams{
    setView: React.Dispatch<React.SetStateAction<number>>;
    setIsNavigationActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const NoAssistant = ({setView, setIsNavigationActive}:NoAssistantParams) => {
    const [currentView, setCurrentView] = useState<number>(0);

    return (
        <>
            { currentView === 0 ?
                <SetScheduleDays
                    setView={setView}
                    setIsNavigationActive={setIsNavigationActive}
                    setCurrentView={setCurrentView}
                /> : null}

            { currentView === 1 ?
                <CreateSchedule
                    setView={setView}
                    setIsNavigationActive={setIsNavigationActive}
                />
                : null}
        </>

    )
}

export default NoAssistant;