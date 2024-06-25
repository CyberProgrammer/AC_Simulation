import YesNoControls from "../button_groups/yesNoControls.tsx";

interface AssistantPromptParams{
    handlePromptClick: (id:number) => void;
}
const AssistantPrompt = ({handlePromptClick}:AssistantPromptParams) => {

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
                <YesNoControls handlePromptClick={handlePromptClick}/>
            </div>
        </div>
    )
}

export default AssistantPrompt;