import {useEffect, useState } from "react";
import { FanStatus , SystemStatus} from "../../types/enums";

import RedLed from '../../assets/icons/red_led.svg';
import GreenLed from '../../assets/icons/green_led.svg';
import YellowLed from "../../assets/icons/yellow_led.svg";

interface LEDDisplayProps {
    label: string;
    fanStatus?: FanStatus
    status: FanStatus | SystemStatus;
    isCooling?: boolean;
}

const LEDDisplay: React.FC<LEDDisplayProps> = ({ label, status, fanStatus, isCooling = false }) => {
    const [currentSrc, setCurrentSrc] = useState<string>(RedLed);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if ((label === "Fan Status" && fanStatus === FanStatus.Wait) || (label === "Condenser Status" && status === SystemStatus.Wait)) {
            interval = setInterval(() => {
                setCurrentSrc(prevSrc => (prevSrc === YellowLed ? RedLed : YellowLed));
            }, 500); // Toggle every half second
        } else {
            // Set the correct static image
            if (isCooling || status === FanStatus.On || status === SystemStatus.Cool) {
                setCurrentSrc(GreenLed);
            } else {
                setCurrentSrc(RedLed);
            }
        }

        return () => clearInterval(interval); // Clear interval on component unmount or status change
    }, [status, isCooling]);

    return (
        <div className={"display"}>
            <p>{label}:</p>
            <img src={currentSrc} alt={"led"} />
        </div>
    );
};

export default LEDDisplay;