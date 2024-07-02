interface TempInfoParams{
    currentTemp: number;
}

const TempInfo = ({ currentTemp }:TempInfoParams) => (
    <div className={"temp-reading"}>
        <h1 className={"digital-text"}>{currentTemp}</h1>
        <h2>&#176;</h2>
    </div>
);

export default TempInfo;