import React, {ReactNode} from "react";
import '../styles/select-prompt.css'

interface SelectPromptParams {
    prompt: string;
    options: string[];
    selected: number;

    children?: ReactNode;
}

const SelectPrompt:React.FC<SelectPromptParams> = ({prompt, options, selected, children}) => {


    return (
        <div className={"menu-container"}>
            <div className={"menu-body"}>
                <div className={"menu-content"}>
                    <div className={"select-menu-options"}>
                        <div className={"menu-option"}>
                            <p className={"dotted-text prompt"}>
                                {prompt}
                            </p>
                            <div id={"prompt-selectable"}>
                                { options.map((option, index) => (
                                    <div className={`menu-option dotted-text ${index === selected ? "selected" : ""}`} key={option}>
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default SelectPrompt;