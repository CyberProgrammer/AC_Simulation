import '../../menu.css'
import './styles/edit_schedule.css'
import React, {useState} from "react";
import AssistantPrompt from "../assistant/assistant_prompt.tsx";
import NoAssistant from "../no_assistant/no_assistant.tsx";

interface EditScheduleParams{
    setView: React.Dispatch<React.SetStateAction<number>>;
    setIsNavigationActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditSchedule = ({setView, setIsNavigationActive}: EditScheduleParams) => {
    const options = ["Use Scheduling Assistant?", "Select the days to schedule"];

    const [hasPrompted, setHasPrompted] = useState<boolean>(false);
    const [useScheduleAssist, setUseScheduleAssist] = useState<boolean>(false);

    const handlePromptClick = (id:number) =>{
        switch (id){
            case 0:
                console.log("No");
                setHasPrompted(true);
                break;
            case 1:
                setIsNavigationActive(true);
                setView(-1);
                break;
            case 2:
                setUseScheduleAssist(true);
                setHasPrompted(true);
                break;
        }
    }

    return(
        <>
            {!hasPrompted ? <AssistantPrompt handlePromptClick={handlePromptClick} /> : null }
            {hasPrompted && !useScheduleAssist ?
                <NoAssistant setView={setView} setIsNavigationActive={setIsNavigationActive}/> : null}
        </>
    )
}

export default EditSchedule;
