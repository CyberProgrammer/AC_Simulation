import PromptControlYN from "./controls/prompt_controls.tsx";

interface AssistantPromptParams{
    handlePromptClick: (id:number) => void;
}
const Prompt_Yes_No = ({handlePromptClick}:AssistantPromptParams) => {

    return (
        <div className={"menu-container"}>
            <div className={"menu-body"}>
                <div className={"menu-content"}>
                    <div className={"menu-options"}>
                        <div className={"menu-option"}>
                            <p className={"dotted-text prompt"}>
                                Use Scheduling Assistant?
                            </p>
                        </div>
                    </div>
                </div>
                <PromptControlYN handlePromptClick={handlePromptClick}/>
            </div>
        </div>
    )
}

export default Prompt_Yes_No;