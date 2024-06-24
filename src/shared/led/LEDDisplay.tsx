import React, {useEffect, useState } from "react";
import { Mode, FanStatus , SystemStatus} from "../../types/enums";

import RedLed from '../../assets/icons/red_led.svg';
import GreenLed from '../../assets/icons/green_led.svg';
import YellowLed from "../../assets/icons/yellow_led.svg";
import DarkYellowLed from "../../assets/icons/dark_yellow_led.svg";

interface LEDDisplayProps {
    label: string;
    mode: Mode;
    fanStatus?: FanStatus
    status: FanStatus | SystemStatus;
    isCooling?: boolean;
}

const LEDDisplay: React.FC<LEDDisplayProps> = ({ label, mode, status, fanStatus, isCooling = false }) => {
    const [currentSrc, setCurrentSrc] = useState<string>(RedLed);

    useEffect(() => {
        if(label === "Fan Status")
            console.log("Fan Status:" , status);
        else
            console.log("Condenser Status:", status);

        let interval: NodeJS.Timeout;

        if ((label === "Fan Status" && fanStatus === FanStatus.Wait) || (label === "Condenser Status" && status === SystemStatus.Wait)) {
            console.log("Here")
            interval = setInterval(() => {
                setCurrentSrc(prevSrc => (prevSrc === YellowLed ? DarkYellowLed : YellowLed));
            }, 500); // Toggle every half second
        } else {
            // Set the correct static image
            console.log("Here 2")
            if (isCooling || (status === FanStatus.On || status === SystemStatus.Cool)) {
                if(!fanStatus && status != SystemStatus.AtTemp)
                    setCurrentSrc(GreenLed);
                else if(fanStatus && status === FanStatus.On)
                    setCurrentSrc(GreenLed);
            } else {
                setCurrentSrc(RedLed);
            }
        }

        return () => clearInterval(interval); // Clear interval on component unmount or status change
    }, [status, isCooling, mode, label, fanStatus]);

    return (
        <div className={"display"}>
            <p>{label}:</p>
            <img src={currentSrc} alt={"led"} />
        </div>
    );
};

export default LEDDisplay;