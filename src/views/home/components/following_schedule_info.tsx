
interface FollowingInfoParams {
    isFollowingSchedule: boolean;
}
const FollowingScheduleInfo = ({isFollowingSchedule}:FollowingInfoParams) => {

    return(
        <div className={'info-container'}>
            <div className={"schedule-info"}>
                <p className={`small-text ${!isFollowingSchedule ? "hidden-text" : ""}`}>
                    Following Schedule
                </p>
            </div>
        </div>
    )
}

export default FollowingScheduleInfo;