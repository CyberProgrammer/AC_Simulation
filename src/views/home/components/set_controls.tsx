import ArrowButton from "@components/buttons/arrow_button.tsx";
import {SystemStatus} from "@customTypes/enums.ts";
import TriangleUp from '@assets/icons/triangle-up.svg';
import TriangleDown from '@assets/icons/triangle-down.svg';
import {handleSetTempDown, handleSetTempUp} from '../../../utils'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../state/store.ts";

interface SetControlsParams{
    isFollowingSchedule: boolean;
    setTemp: number;
    currentTemp: number;
    callForCooling: boolean;
    setCallForCooling: (setCallForCooling: boolean) => void;
}
const SetControls = ({
        isFollowingSchedule,
        setTemp,
        currentTemp,
        callForCooling,
        setCallForCooling
}:SetControlsParams) => {

    const dispatch = useDispatch();

    const mode = useSelector((state:RootState) => state.general.mode);
    const status = useSelector((state:RootState) => state.general.status);

    const fanSetting = useSelector((state: RootState) => state.fan.fanSetting);

    return (
        <div className={"set-controls"}>
            <div className={"set-info"}>
                <p className={"small-text"}>Set</p>
                <p className={"small-text"}>To</p>
            </div>
            <div className={"controls"}>
                <ArrowButton
                    className={"temp-button"}
                    isDisabled={status === SystemStatus.Wait || isFollowingSchedule}
                    clickEvent={() => handleSetTempUp(
                        {
                        mode,
                        setTemp,
                        currentTemp,
                        callForCooling,
                        setCallForCooling,
                        fanSetting,
                        dispatch,
                    })}
                    icon={TriangleUp}
                />
                <div className={"temp-reading"}>
                    <h2 className={"digital-text"}>{setTemp}</h2>
                    <h3>&#176;</h3>
                </div>
                <ArrowButton
                    className={"temp-button"}
                    isDisabled={status === SystemStatus.Wait || isFollowingSchedule}
                    clickEvent={() => handleSetTempDown({
                        mode,
                        setTemp,
                        currentTemp,
                        callForCooling,
                        setCallForCooling,
                        fanSetting,
                        dispatch
                    })}
                    icon={TriangleDown}
                />
            </div>
        </div>
    )
}

export default SetControls;