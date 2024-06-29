import React from "react";

import '../../styles/prompt_controls.css'

import ControlButton from "@components/buttons/control_button.tsx";
import TriangleLeft from "@assets/icons/triangle-left.svg";
import TriangleRight from "@assets/icons/triangle-right.svg";

interface ArrowsLeftRightParams {
    handleLeftClick: () => void;
    handleSelectClick?: () => void;
    handleDoneClick?: () => void;
    handleCancelClick?: () => void;
    handleRightClick: () => void;
}
const ArrowsLeftRight:React.FC<ArrowsLeftRightParams> = ({handleLeftClick, handleSelectClick, handleDoneClick,handleCancelClick , handleRightClick}) => {

    return (
        <div className={"prompt-controls"}>
            <div className={"prompt-controls-left"}>
                <ControlButton
                    buttonClass={"left-control"}
                    imageClass={"control-img"}
                    imageSource={TriangleLeft}
                    clickEvent={handleLeftClick}
                />
            </div>
            <div className={"prompt-controls-center"}>
                {handleSelectClick && (
                    <ControlButton
                        buttonClass={"select-control"}
                        textClass={""}
                        text={"Select"}
                        clickEvent={handleSelectClick}
                    />
                )}
                {handleDoneClick && (
                    <ControlButton
                        buttonClass={"select-control"}
                        textClass={""}
                        text={"Done"}
                        clickEvent={handleDoneClick}
                    />
                )}
                {handleCancelClick && (
                    <ControlButton
                        buttonClass={"select-control"}
                        textClass={""}
                        text={"Cancel"}
                        clickEvent={handleCancelClick}
                    />
                )}
            </div>
            <div className={"prompt-controls-right"}>
                <ControlButton
                    buttonClass={"right-control"}
                    imageClass={"control-img"}
                    imageSource={TriangleRight}
                    clickEvent={handleRightClick}
                />
            </div>
        </div>
    )
}

export default ArrowsLeftRight;