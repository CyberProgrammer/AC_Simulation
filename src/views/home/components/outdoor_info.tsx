interface OutdoorInfoParams{
    outdoorTemp: number;
    outdoorHumidity: number;
}

const OutdoorInfo = ({outdoorTemp, outdoorHumidity}:OutdoorInfoParams) => (
    <p className={"h3 dotted-text"}>Outdoor: {outdoorTemp}&#176;/{outdoorHumidity}%</p>
);

export default OutdoorInfo;