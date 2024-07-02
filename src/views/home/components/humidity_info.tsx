interface HumidityInfoParams{
    humidityPercentage: number;
}

const HumidityInfo = ({humidityPercentage}:HumidityInfoParams) => (
    <div className={"humidity-reading"}>
        <p className={"digital-text"}>{humidityPercentage}%</p>
        <p>Humidity</p>
    </div>
);

export default HumidityInfo;