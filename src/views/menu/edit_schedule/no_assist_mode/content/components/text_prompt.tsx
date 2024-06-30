import React from "react";

interface TextPromptParams {
    text: string;
    text_two?:string;
    condition?:boolean;
}
const TextPrompt:React.FC<TextPromptParams> = ({text, text_two, condition}) => {
    return (
        <div className={"menu-content"}>
            <div className={"menu-options"}>
                <div className={"menu-option"}>
                    <p className={"dotted-text prompt"}>
                        {!condition ? text : text_two}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TextPrompt;