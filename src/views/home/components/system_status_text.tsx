import {SystemStatus} from "@customTypes/enums.ts";

interface StatusParams{
    status: SystemStatus;
}
const SystemStatusText = ({status}:StatusParams) => {
    return (
        <p className={"h3 dotted-text"}>
            System: {SystemStatus[status] === "AtTemp" ? "At Temp" : SystemStatus[status]}
        </p>
    )
}

export default SystemStatusText;