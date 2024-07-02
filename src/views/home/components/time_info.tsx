
interface TimeInfoParams{
    isManualTime: boolean;
    formattedManualTime: string;
    currentTime: string;
    manualPeriod: string;
    isAM: boolean
}
const TimeInfo = ({ isManualTime, formattedManualTime, currentTime, manualPeriod, isAM }:TimeInfoParams) => (
    <div className={"info-left"}>
        <h3 className={"digital-text"}>{isManualTime ? formattedManualTime : currentTime}</h3>
        <p>{isManualTime ? manualPeriod : isAM ? "am" : "pm"}</p>
    </div>
);

export default TimeInfo;