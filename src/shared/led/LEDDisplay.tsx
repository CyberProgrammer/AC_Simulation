import {useEffect, useState } from "react";
import {FanStatus , SystemStatus} from "@customTypes/enums";

/* Assets */
import RedLed from '@assets/icons/red_led.svg';
import GreenLed from '@assets/icons/green_led.svg';
import YellowLed from "@assets/icons/yellow_led.svg";
import DarkYellowLed from "@assets/icons/dark_yellow_led.svg";
/* Contexts */
import {useFan} from "@contexts/fan_context.tsx";
import {useSelector} from "react-redux";

import {RootState} from "../../state/store.ts";

interface LEDDisplayProps {
    label: string;
    isCooling?: boolean;
}

const LEDDisplay: React.FC<LEDDisplayProps> = ({ label, isCooling = false }) => {
    const mode = useSelector((state: RootState) => state.general.mode);
    const status = useSelector((state: RootState) => state.general.status);

    const {fanStatus} = useFan();
    const [currentSrc, setCurrentSrc] = useState<string>(RedLed);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if ((label === "Fan Status" && fanStatus === FanStatus.Wait) || (label === "Condenser Status" && status === SystemStatus.Wait)) {
            interval = setInterval(() => {
                setCurrentSrc(prevSrc => (prevSrc === YellowLed ? DarkYellowLed : YellowLed));
            }, 500); // Toggle every half second
        } else {
            // Set the correct static image
            if(label === "Fan Status"){
                if(fanStatus === FanStatus.On){
                    setCurrentSrc(GreenLed);
                } else{
                    setCurrentSrc(RedLed);
                }
            } else{
                if(isCooling && status === SystemStatus.Cool || status === SystemStatus.Heat){
                    setCurrentSrc(GreenLed);
                } else{
                    setCurrentSrc(RedLed);
                }
            }
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [label, mode, status, fanStatus, isCooling]);

    return (
        <div className={"display"}>
            <p>{label}:</p>
            <img src={currentSrc} alt={"led"} />
        </div>
    );
};

export default LEDDisplay;