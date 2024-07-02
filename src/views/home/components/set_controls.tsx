import ArrowButton from "@components/buttons/arrow_button.tsx";
import {FanSetting, FanStatus, Mode, SystemStatus} from "@customTypes/enums.ts";
import TriangleUp from '@assets/icons/triangle-up.svg';
import TriangleDown from '@assets/icons/triangle-down.svg';
import {handleSetTempDown, handleSetTempUp} from '../../../utils'

interface SetControlsParams{
    mode: Mode;
    status: SystemStatus;
    isFollowingSchedule: boolean;
    setTemp: number;
    setSetTemp: (setTemp: number) => void;
    currentTemp: number;
    callForCooling: boolean;
    setCallForCooling: (setCallForCooling: boolean) => void;
    fanSetting: FanSetting;
    setStatus: (val: SystemStatus) => void;
    setFanStatus: (status: FanStatus) => void;
}
const SetControls = ({
        mode,
        status,
        isFollowingSchedule,
        setTemp,
        setSetTemp,
        currentTemp,
        callForCooling,
        setCallForCooling,
        fanSetting,
        setStatus,
        setFanStatus}:SetControlsParams) => {
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
                        setSetTemp,
                        currentTemp,
                        callForCooling,
                        setCallForCooling,
                        fanSetting,
                        setStatus,
                        setFanStatus
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
                        setSetTemp,
                        currentTemp,
                        callForCooling,
                        setCallForCooling,
                        fanSetting,
                        setStatus,
                        setFanStatus
                    })}
                    icon={TriangleDown}
                />
            </div>
        </div>
    )
}

export default SetControls;