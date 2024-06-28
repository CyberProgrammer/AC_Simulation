import '../menu.css'
import './styles/edit_schedule.css'
import React, {useState} from "react";
import Prompt_Yes_No from "@components/prompts/prompt_yes_no.tsx";
import NoAssistant from "./no_assist_mode/no_assistant.tsx";

interface EditScheduleParams{
    setView: React.Dispatch<React.SetStateAction<number>>;
    setIsNavigationActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditSchedule = ({setView, setIsNavigationActive}: EditScheduleParams) => {

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
            {!hasPrompted ? <Prompt_Yes_No handlePromptClick={handlePromptClick} /> : null }
            {hasPrompted && !useScheduleAssist ?
                <NoAssistant setView={setView} setIsNavigationActive={setIsNavigationActive}/> : null}
        </>
    )
}

export default EditSchedule;
